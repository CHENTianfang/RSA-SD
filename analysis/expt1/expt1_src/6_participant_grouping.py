import pandas as pd
import glob
import os
import shutil

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt1/expt1_data/*.csv')  # 选择目录和文件类型

# 定义目标文件夹路径
target_folders = {
    'relevance': 'C:/analysis/expt1/expt1_out/relevance/',
    'unbias': 'C:/analysis/expt1/expt1_out/unbias/',
    'truth': 'C:/analysis/expt1/expt1_out/truth/'
}

# 创建目标文件夹（如果不存在）
for folder in target_folders.values():
    if not os.path.exists(folder):
        os.makedirs(folder)

# 移动文件的函数
def move_file(file_path, group):
    # 获取目标文件夹路径
    target_folder = target_folders.get(group)
    if target_folder:
        # 获取文件名
        file_name = os.path.basename(file_path)
        # 移动文件
        shutil.move(file_path, os.path.join(target_folder, file_name))
        print(f"文件 {file_name} 被移动到 {group} 文件夹中。")
    else:
        print(f"没有找到对应的文件夹: {group}")

# 读取并处理每个文件
for file_path in file_paths:
    data = pd.read_csv(file_path, header=None)

    # 获取第18行第11列的值，判断分组
    group_value = str(data.iloc[0, 10]).strip()  # 第2行，第11列

    # 判断并移动文件
    if group_value in target_folders:
        move_file(file_path, group_value)
    else:
        print(f"文件 {file_path} 中的分组信息无效：{group_value}")
