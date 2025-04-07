import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt3/expt3_out/tourist/*.csv')  # 选择目录和文件类型

# 存储每个文件的统计结果
results = []

# 获取文件夹名称（用于命名输出文件）
folder_name = os.path.basename(os.path.dirname(file_paths[0]))

# 解析每个文件
for file_path in file_paths:
    data = pd.read_csv(file_path, header=None)

    # 获取特征分数（L列第18行）
    feature_scores_str = str(data.iloc[3, 11])  # 强制转换为字符串（防止是其他类型）

    # 检查并解析字符串为字典
    def convert_to_dict(feature_scores_str):
        if feature_scores_str == 'nan' or not feature_scores_str.strip():  # 检查是否为NaN或空字符串
            print(f"读取的数据无效或为空，文件: {file_path}")
            return {}

        try:
            feature_scores = eval(feature_scores_str)  # 将字符串格式的字典转换为字典列表
            score_dict = {list(item.keys())[0]: list(item.values())[0] for item in feature_scores}
            return score_dict
        except Exception as e:
            print(f"解析数据时出错: {e}, 文件: {file_path}")
            return {}

    # 将字符串转换为字典
    score_dict = convert_to_dict(feature_scores_str)

    # 统计每个被试的真实回答次数
    def is_true_response(feature, score, score_dict):
        feature = feature.replace('色', '')
        return score_dict.get(feature) == score

    def count_true_responses(data, start_row=1, feature_col=15, score_col=16, score_dict=score_dict):
        true_responses = []
        non_na_count = 0  # 统计有效数据的数量

        # 从第19行开始遍历每一行数据
        for index, row in data.iloc[start_row:].iterrows():
            if pd.isna(row[feature_col]) or pd.isna(row[score_col]):
                continue  # 跳过空值数据

            feature = row[feature_col]  # P列的特征
            score = row[score_col]  # Q列的分数

            non_na_count += 1  # 统计有效数据行

            if is_true_response(feature, score, score_dict):
                true_responses.append(1)
            else:
                true_responses.append(0)

        return sum(true_responses), non_na_count  # 返回真实回答的总数和有效数据的数量

    # 执行函数来统计真实回答次数
    true_response_count, valid_count = count_true_responses(data)
    false_response_count = valid_count - true_response_count  # 计算不真实的回答

    # 将统计结果存入列表
    results.append({
        '文件名': file_path,
        '真实回答次数': true_response_count,
        '不真实回答次数': false_response_count
    })

# 将结果存入 DataFrame
results_df = pd.DataFrame(results)

# 创建输出文件路径，文件名为文件夹名称 + '_statistics_results.csv'
output_file_path = f'C:/analysis/expt3/expt3_result/true/A2true_results_{folder_name}.csv'

# 保存到新的 CSV 文件，使用 utf-8-sig 编码
results_df.to_csv(output_file_path, index=False, encoding='utf-8-sig')

# 打印结果
print(results_df)
