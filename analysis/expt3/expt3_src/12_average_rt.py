import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt3/expt3_out/tourist/*.csv')  # 请修改为你的文件夹路径

# 统计结果存储列表
results = []

folder_name = os.path.basename(os.path.dirname(file_paths[0]))

# 处理每个文件
def process_file(file_path):
    # 读取 CSV 文件
    data = pd.read_csv(file_path, encoding='utf-8-sig',header=None)

    # 确保文件至少有 85 行
    if len(data) < 85:
        print(f"⚠ 文件 {file_path} 行数不足，跳过计算")
        return

    # 选取第7列（索引6）数据，从第2行（索引1）到第85行（索引84）
    selected_data = data.iloc[1:85, 6]

    # 计算平均值，跳过 NaN 值，并转换为秒
    avg_ms = selected_data.mean(skipna=True)
    avg_sec = avg_ms / 1000  # 毫秒转换为秒

    # 记录结果
    results.append({
        '文件名': os.path.basename(file_path),
        '平均值（秒）': avg_sec
    })

    print(f"✅ 处理完成：{file_path}")

# 遍历所有 CSV 文件
for file_path in file_paths:
    process_file(file_path)

# 生成新的 CSV 文件，记录所有文件的平均值
output_file = f'C:/analysis/expt3/expt3_result/average_seconds_{folder_name}.csv'
results_df = pd.DataFrame(results)
results_df.to_csv(output_file, index=False, encoding='utf-8-sig')

print(f"\n📂 所有文件的平均值已保存至：{output_file}")