import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt3/expt3_data/*.csv')  # 选择目录和文件类型

# 存储合格和不合格的文件结果
passed_files = []
failed_files = []

# 定义检查每一组是否合格的函数
def check_group(group_start, group_end):
    # 获取每一组的第18列（索引17）和第19列（索引18）的数据
    group_data = data.iloc[group_start:group_end, [17, 18]]  # 选择第18列和第19列
    group_r = group_data.iloc[:, 0]  # 第18列（R列）
    group_s = group_data.iloc[:, 1]  # 第19列（S列）
    
    # 统计 R 列和 S 列相等的次数
    equal_count = (group_r == group_s).sum()
    
    # 输出该组的检查结果
    print(f"第{group_start + 2}-{group_end + 2}行相等的次数: {equal_count}")  # 行号加2
    
    # 如果相等次数少于6，返回不合格
    if equal_count < 6:
        return False  # 不合格
    return True  # 合格

# 检查每一行是否有数值，并输出行号
def check_non_empty_rows():
    non_empty_rows = []

    for idx, row in data.iterrows():
        # 检查第18列（索引17）和第19列（索引18）是否有数值
        if pd.notna(row[17]) and pd.notna(row[18]):  # 检查非NaN值
            non_empty_rows.append((idx + 2, row[17], row[18]))  # 行号加2（考虑第一行为标签）

    # 输出每一行的内容以及行号
    print("\n有数值的行：")
    for row in non_empty_rows:
        print(f"第{row[0]}行: R列值 = {row[1]}, S列值 = {row[2]}")

# 执行行检查
def check_file(file_path):
    global data
    data = pd.read_csv(file_path)  # 读取文件

    # 检查每一组
    result_1 = check_group(1, 36)  # 第一组：3-38行
    result_2 = check_group(38, 73)  # 第二组：40-75行
    result_3 = check_group(75, 110)  # 第三组：77-112行

    # 输出所有组的结果
    if not result_1 or not result_2 or not result_3:
        print(f"文件 {file_path} 检查为不合格。")
        failed_files.append(file_path)
        os.remove(file_path)  # 删除不合格文件
        return False
    else:
        passed_files.append(file_path)
        return True

# 统计合格与不合格的文件
for file_path in file_paths:
    print(f"\n检查文件：{file_path}")
    check_file(file_path)

# 输出合格与不合格的文件数量
print(f"\n合格的文件数量：{len(passed_files)}")
print(f"不合格的文件数量：{len(failed_files)}")
