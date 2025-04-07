import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt2/expt2_data/*.csv')  # 选择目录和文件类型

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
        # 检查并根据条件修改第11列
        if condition == '{"Q0":"告诉游客有关你的蘑菇特征的事实。","Q1":"不可以，撒谎是不被允许的","Q2":"不重要，游客选择什么蘑菇不重要"}':
            data.iloc[:, 10] = data.iloc[:, 10].replace('truth', 'guide')  # 第11列是索引10
            break  # 找到匹配的就跳出循环
        elif condition == '{"Q0":"告诉游客有关蘑菇的事实\\n\\n无论是你的分数还是游客的分数都可以。","Q1":"不可以，撒谎是不被允许的","Q2":"不重要，游客选择什么蘑菇不重要"}':
            data.iloc[:, 10] = data.iloc[:, 10].replace('truth', 'unbias')  # 第11列是索引10
            break
        elif condition == '{"Q0":"教游客有关他（她）的蘑菇特征的事实。","Q1":"不可以，撒谎是不被允许的","Q2":"不重要，游客选择什么蘑菇不重要"}':
            data.iloc[:, 10] = data.iloc[:, 10].replace('truth', 'tourist')  # 第11列是索引10
            break

    # 保存修改后的文件到原路径，使用 utf-8-sig 编码保存
    data.to_csv(file_path, index=False, encoding='utf-8-sig')
    print(f"文件已保存为：{file_path}")

# 处理所有 CSV 文件
for file_path in file_paths:
    print(f"\n正在处理文件：{file_path}")
    process_file(file_path)
