import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt3/expt3_data/*.csv')  # 选择目录和文件类型

# 处理每个文件
def process_file(file_path):
    # 读取文件
    data = pd.read_csv(file_path)

    # 查找第11列（索引10）中的值是'relevance'、'unbias'或'truth'的行
    for idx, value in enumerate(data.iloc[:, 10]):  # 第11列是索引10
        if value in ['guide', 'unbias', 'tourist']:
            print(f"找到分组 '{value}' 在第 {idx + 1} 行")

            # 截取从该行开始的所有数据，删除之前的所有行
            new_data = data.iloc[idx:].reset_index(drop=True)

            # 保存修改后的文件到原路径，直接覆盖原文件
            new_data.to_csv(file_path, index=False, encoding='utf-8-sig')
            print(f"文件已保存为：{file_path}")
            return

    print(f"在文件 {file_path} 中没有找到 'guide', 'unbias' 或 'tourist' 的行。")

# 处理所有 CSV 文件
for file_path in file_paths:
    print(f"\n正在处理文件：{file_path}")
    process_file(file_path)

