import pandas as pd
import glob
import os
import json

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt2/expt2_data/*.csv')  # 选择目录和文件类型

# 处理每个文件
def process_file(file_path):
    # 读取文件，设置第一行作为列名
    data = pd.read_csv(file_path, header=None)

    # 获取第4行第12列和第5行第12列的值并转换为 JSON
    try:
        tourist_data = json.loads(str(data.iloc[2, 11]))  # 第4行是索引3，第12列是索引11
        guide_data = json.loads(str(data.iloc[3, 11]))    # 第5行是索引4，第12列是索引11
    except Exception as e:
        print(f"解析JSON时出错，文件: {file_path}, 错误信息: {e}")
        return

    # 去掉 '_A1' 和 '_A2' 后缀的函数
    def remove_suffix(data_list, suffix):
        return [{key.replace(suffix, ''): value} for item in data_list for key, value in item.items() if suffix in key]

    # 去掉 '_A1' 和 '_A2' 后缀
    tourist_data_cleaned = remove_suffix(tourist_data, "_A1")  # 去掉 '_A1'
    guide_data_cleaned = remove_suffix(guide_data, "_A2")      # 去掉 '_A2'

    # 将清理后的数据存入第4行、第5行第12列
    data.iloc[2, 11] = json.dumps(tourist_data_cleaned, ensure_ascii=False)  # 保存清理后的tourist数据
    data.iloc[3, 11] = json.dumps(guide_data_cleaned, ensure_ascii=False)    # 保存清理后的guide数据

    # 保存修改后的文件到原路径，使用 utf-8-sig 编码保存
    data.to_csv(file_path, index=False, encoding='utf-8-sig', header=False)
    print(f"文件已保存为：{file_path}")

# 处理所有 CSV 文件
for file_path in file_paths:
    print(f"\n正在处理文件：{file_path}")
    process_file(file_path)
