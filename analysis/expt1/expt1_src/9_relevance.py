import csv
import json
import numpy as np
import glob
import os

# ==================================================================
# 全局配置
# ==================================================================
COLOR_MAPPING = {
    "蓝": "blue", "蓝色": "blue",
    "绿": "green", "绿色": "green",
    "红": "red", "红色": "red",
    "blue": "blue", "green": "green", "red": "red",
}

TEXTURE_MAPPING = {
    "条纹": "striped", "斑点": "spotted", "纯": "solid",
    "striped": "striped", "spotted": "spotted", "solid": "solid"
}

# ==================================================================
# 核心计算模块
# ==================================================================
def compute_relevance_utility(mushrooms, utterance):
    """计算单个试次的相关效用"""
    try:
        # 特征解析
        feature_type = utterance.get("feature_type", "texture")
        processed_feature = utterance["feature"].lower()
        feature_value = int(utterance["value"])

        if not (-2 <= feature_value <= 2):
            return np.nan

        # 概率分配计算
        P_alloc = (feature_value - (-2)) / (2 - (-2))

        # 蘑菇特征匹配
        has_feature = []
        for m in mushrooms:
            target_field = m["color"] if feature_type == "color" else m["texture"]
            cleaned_target = ''.join(filter(str.isalpha, str(target_field))).lower()
            has_feature.append(cleaned_target == processed_feature)

        match_count = sum(has_feature)
        total = len(mushrooms)

        if match_count == 0:
            return float(np.mean([m["value"] for m in mushrooms]))

        # 概率分配计算
        P_remain = 1 - P_alloc
        prob_dist = []
        for is_match in has_feature:
            if is_match:
                base = P_alloc / match_count
                if match_count == total:
                    base += P_remain / total
            else:
                base = P_remain / (total - match_count) if (total - match_count) > 0 else 0
            prob_dist.append(base)

        # Softmax计算
        prob_array = np.array(prob_dist)
        prob_array /= prob_array.sum()
        exp_weights = np.exp(prob_array)
        action_probs = exp_weights / exp_weights.sum()
        scores = np.array([m["value"] for m in mushrooms])
        return float(np.dot(action_probs, scores))

    except Exception:
        return np.nan


# ==================================================================
# 数据解析模块
# ==================================================================
def parse_mushroom(cell):
    """解析蘑菇数据"""
    try:
        data = json.loads(cell.replace("'", "\"").strip())
        raw_color = ''.join(filter(str.isalpha, data["color"])).lower().replace("色", "")
        return {
            "color": COLOR_MAPPING.get(raw_color, "unknown"),
            "texture": data["type"].lower().strip(),
            "value": int(str(data["value"]).strip())
        }
    except Exception:
        return {"color": "error", "texture": "error", "value": 0}


def parse_utterance(cell):
    """解析被试回答"""
    try:
        data = json.loads(cell.replace("'", "\"").strip())
        original_feature = data["feature"].strip()
        
        # 清理特征字符串
        raw_feature = ''.join(filter(str.isalpha, original_feature)).lower()
        
        # 优先匹配纹理特征
        texture_candidate = raw_feature.replace("色", "")
        if texture_candidate in TEXTURE_MAPPING:
            return {
                "feature": TEXTURE_MAPPING[texture_candidate],
                "value": int(data["value"]),
                "feature_type": "texture"
            }
        
        # 次优先匹配颜色特征
        if raw_feature in COLOR_MAPPING:
            return {
                "feature": COLOR_MAPPING[raw_feature],
                "value": int(data["value"]),
                "feature_type": "color"
            }
        
        # 默认未知类型
        return {"feature": "unknown", "value": int(data["value"]), "feature_type": "error"}
    
    except Exception:
        return {"feature": "error", "value": 0, "feature_type": "error"}


# ==================================================================
# 文件处理模块
# ==================================================================
def process_single_file(input_path, output_path):
    """处理单个CSV文件"""
    try:
        with open(input_path, "r", encoding="utf-8-sig") as f_in, \
                open(output_path, "w", newline="", encoding="utf-8-sig") as f_out:

            reader = csv.reader(f_in)
            writer = csv.writer(f_out)
            header = next(reader)
            writer.writerow(header + ["RelevanceUtility", "原始蘑菇分数", "相关率"])

            utilities = []
            relevance_rates = []  # 用于存储每行的相关率
            original_scores = []  # 用于存储每行的原始蘑菇分数
            for row in reader:
                try:
                    if len(row) < 15:
                        continue

                    mushrooms = [parse_mushroom(cell) for cell in row[12:15]]
                    utterance = parse_utterance(row[8])
                    relevance_utility = compute_relevance_utility(mushrooms, utterance)

                    # 计算原始蘑菇分数的平均值
                    original_score = np.mean([m["value"] for m in mushrooms])

                    # 判断相关效用与原始分数的比较结果
                    relevance_rate = 1 if relevance_utility > original_score else 0

                    # 写入新的行数据，包含相关效用、原始蘑菇分数和相关率
                    writer.writerow(row + [f"{relevance_utility:.4f}", f"{original_score:.4f}", relevance_rate])
                    utilities.append(relevance_utility)
                    relevance_rates.append(relevance_rate)  # 存储相关率
                    original_scores.append(original_score)  # 存储原始蘑菇分数

                except Exception:
                    writer.writerow(row + ["ERROR", "ERROR", "ERROR"])

            # 计算平均相关率
            average_relevance_rate = np.mean(relevance_rates) if relevance_rates else 0

            return {
                "平均效用": np.nanmean(utilities),
                "有效数据量": sum(~np.isnan(utilities)),
                "总行数": len(utilities),
                "平均相关率": average_relevance_rate  # 新增字段
            }

    except Exception:
        return {}


def process_batch_files(input_pattern, output_dir):
    """批量处理CSV文件"""
    os.makedirs(output_dir, exist_ok=True)
    summary = []

    for path in sorted(glob.glob(input_pattern), key=os.path.getmtime):
        try:
            output_path = os.path.join(output_dir, f"processed_{os.path.basename(path)}")
            stats = process_single_file(path, output_path)
            summary.append({
                "文件名": os.path.basename(path),
                "状态": "成功",
                **stats
            })
        except Exception as e:
            summary.append({
                "文件名": os.path.basename(path),
                "状态": "失败",
                "错误信息": str(e)
            })

    if summary:
        generate_summary_report(summary, output_dir)


def generate_summary_report(data, output_dir):
    """生成汇总报告"""
    report_path = os.path.join(output_dir, "实验汇总报告.csv")
    with open(report_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=["文件名", "状态", "平均效用", "有效数据量", "总行数", "平均相关率", "错误信息"])
        writer.writeheader()
        writer.writerows(data)


# ==================================================================
# 主程序
# ==================================================================
if __name__ == "__main__":
    process_batch_files(r"C:\analysis\expt1\expt1_out\unbias\*.csv", r"C:\analysis\expt1\expt1_result\utility\rate")
