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

    # 获取第2行第12列的值并转换为 JSON
    json_data = str(data.iloc[0, 11])  # 第2行是索引0，第12列是索引11
    try:
        data_list = json.loads(json_data)
    except Exception as e:
        print(f"解析JSON时出错，文件: {file_path}, 错误信息: {e}")
        return

    # 分组数据
    group_1 = [{k: v} for d in data_list for k, v in d.items() if '_A1' not in k and '_A2' not in k]  # 删除带有 _A1 和 _A2 的键
    group_2 = [{k: v} for d in data_list for k, v in d.items() if '_A1' in k]  # 只包含带有 _A1 的键
    group_3 = [{k: v} for d in data_list for k, v in d.items() if '_A2' in k]  # 只包含带有 _A2 的键

    # 将分组后的数据存入第3行、第4行、第5行第12列
    data.iloc[1, 11] = json.dumps(group_1, ensure_ascii=False)  # 第3行是索引2，第12列是索引11
    data.iloc[2, 11] = json.dumps(group_2, ensure_ascii=False)  # 第4行是索引3，第12列是索引11
    data.iloc[3, 11] = json.dumps(group_3, ensure_ascii=False)  # 第5行是索引4，第12列是索引11

    # 保存修改后的文件到原路径，使用 utf-8-sig 编码保存
    data.to_csv(file_path, index=False, encoding='utf-8-sig', header=False)
    print(f"文件已保存为：{file_path}")

# 处理所有 CSV 文件
for file_path in file_paths:
    print(f"\n正在处理文件：{file_path}")
    process_file(file_path)
