import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt1/expt1_out/unbias/*.csv')  # 请修改为你的文件夹路径

# 统计结果存储列表
results = []

folder_name = os.path.basename(os.path.dirname(file_paths[0]))

# 处理每个文件
def process_file(file_path):
    # 读取 CSV 文件
    data = pd.read_csv(file_path, encoding='utf-8-sig')

    # 确保文件至少有 88 行
    if len(data) < 84:
        print(f"⚠ 文件 {file_path} 行数不足，跳过计算")
        return

    # 选取第7列（索引6）数据
    group1 = data.iloc[0:27, 6]  # 第一组：3-30行（索引2-29）
    group2 = data.iloc[28:55, 6]  # 第二组：32-59行（索引31-58）
    group3 = data.iloc[56:83, 6]  # 第三组：61-88行（索引60-87）

    # 计算每个组的平均值，跳过 NaN 值
    avg_group1 = group1.mean(skipna=True)
    avg_group2 = group2.mean(skipna=True)
    avg_group3 = group3.mean(skipna=True)

    # 计算总平均值（所有三组数据）
    total_avg = pd.concat([group1, group2, group3]).mean(skipna=True)

    # 记录结果
    results.append({
        '文件名': os.path.basename(file_path),
        '第一组平均值': avg_group1,
        '第二组平均值': avg_group2,
        '第三组平均值': avg_group3,
        '总平均值': total_avg
    })

    print(f"✅ 处理完成：{file_path}")


# 遍历所有 CSV 文件
for file_path in file_paths:
    process_file(file_path)

# 生成新的 CSV 文件，记录所有文件的平均值
output_file = f'C:/analysis/expt1/expt1_result/average_rt_{folder_name}.csv'
results_df = pd.DataFrame(results)
results_df.to_csv(output_file, index=False, encoding='utf-8-sig')

print(f"\n📂 所有文件的平均值已保存至：{output_file}")
