import pandas as pd
import glob
import os
import json
import re

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt3/expt3_data/*.csv')  # 选择目录和文件类型

# 处理每个文件
def process_file(file_path):
    # 读取文件，设置第一行作为列名
    data = pd.read_csv(file_path)  # 让pandas将第一行作为列名

    # 按顺序查找第19行、第13行、第7行第9列的值
    conditions = [
        str(data.iloc[17, 8]),  # 第19行（索引18），第9列（索引8）
        str(data.iloc[11, 8]),  # 第13行（索引12），第9列（索引8）
        str(data.iloc[5, 8])    # 第7行（索引6），第9列（索引8）
    ]

    # 遍历查找每个条件
    for condition in conditions:
        # 正则表达式用于提取斑点价值中的整数
        match = re.match(r'{"Q0":"([^"]+)","Q1":"([^"]+)","Q2":"斑点价值(\d+)分"}', condition)

        if match:
            # 提取 Q2 中的 x 值
            x_value = match.group(3)

            # 根据不同的情况更新第11列的值
            if "游客希望你尽量多讲讲你的特征分数" in match.group(1):  # 处理 guide
                new_json = {"Q0": "游客希望你尽量多讲讲你的特征分数。", "Q1": "它们可以吃", "Q2": f"斑点价值{x_value}分"}
                data.iloc[:, 10] = data.iloc[:, 10].replace('unbias', 'guide')
                break
            elif "给游客讲讲蘑菇的特征" in match.group(1):  # 处理 unbias
                new_json = {"Q0": "给游客讲讲蘑菇的特征", "Q1": "它们可以吃", "Q2": f"斑点价值{x_value}分"}
                data.iloc[:, 10] = data.iloc[:, 10].replace('unbias', 'unbias')
                break
            elif "游客希望你尽量多讲讲他们的特征分数" in match.group(1):  # 处理 tourist
                new_json = {"Q0": "游客希望你尽量多讲讲他们的特征分数。", "Q1": "它们可以吃", "Q2": f"斑点价值{x_value}分"}
                data.iloc[:, 10] = data.iloc[:, 10].replace('unbias', 'tourist')
                break

    # 保存修改后的文件到原路径，使用 utf-8-sig 编码保存
    data.to_csv(file_path, index=False, encoding='utf-8-sig')
    print(f"文件已保存为：{file_path}")

# 处理所有 CSV 文件
for file_path in file_paths:
    print(f"\n正在处理文件：{file_path}")
    process_file(file_path)