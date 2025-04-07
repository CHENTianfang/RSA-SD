import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt2/expt2_data/*.csv')  # 修改为你的文件夹路径

# 处理每个文件
def process_file(file_path):
    # 读取 CSV 文件
    data = pd.read_csv(file_path, encoding='utf-8-sig')

    # 过滤掉第20列（索引19）值为 "pass" 或 "fail" 的行
    filtered_data = data[~data.iloc[:, 19].isin(["pass", "fail"])].reset_index(drop=True)

    # 保存修改后的文件，覆盖原文件
    filtered_data.to_csv(file_path, index=False, encoding='utf-8-sig')
    print(f"文件已处理并保存：{file_path}")

# 处理所有 CSV 文件
for file_path in file_paths:
    print(f"\n正在处理文件：{file_path}")
    process_file(file_path)
