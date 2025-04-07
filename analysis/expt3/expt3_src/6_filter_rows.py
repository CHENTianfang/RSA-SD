import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt3/expt3_data/*.csv')  # 选择目录和文件类型

# 处理每个文件
def process_file(file_path):
    # 读取文件，关闭标题行
    data = pd.read_csv(file_path)

    # 删除指定行：31、60、89和90行（对应索引30, 59, 88, 89）
    data = data.drop([29, 58, 87, 88], axis=0)

    # 保存修改后的文件到原路径，使用 utf-8-sig 编码保存
    data.to_csv(file_path, index=False, header=False, encoding='utf-8-sig')
    print(f"文件已保存为：{file_path}")

# 处理所有 CSV 文件
for file_path in file_paths:
    print(f"\n正在处理文件：{file_path}")
    process_file(file_path)

