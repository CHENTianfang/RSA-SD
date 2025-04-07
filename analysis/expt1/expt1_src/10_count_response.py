import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt1/expt1_out/truth/*.csv')  # 选择目录和文件类型

# 存储每个文件的统计结果
results = []

# 获取文件夹名称（用于命名输出文件）
folder_name = os.path.basename(os.path.dirname(file_paths[0]))

# 解析每个文件
for file_path in file_paths:
    data = pd.read_csv(file_path, header=None)

    # 获取第17列（第16列索引）的数据，从第2行到第85行
    responses = data.iloc[1:85, 16]  # 注意：Python是从0开始索引，所以第17列的索引是16

    # 统计正数、负数和零的数量
    positive_count = (responses > 0).sum()  # 正数
    negative_count = (responses < 0).sum()  # 负数
    zero_count = (responses == 0).sum()  # 零

    # 将统计结果存入列表
    results.append({
        '文件名': file_path,
        '正数数量': positive_count,
        '负数数量': negative_count,
        '零的数量': zero_count
    })

# 将结果存入 DataFrame
results_df = pd.DataFrame(results)

output_file_path = f'C:/analysis/expt1/expt1_result/times/responds_results_{folder_name}.csv'

# 保存到新的 CSV 文件，使用 utf-8-sig 编码
results_df.to_csv(output_file_path, index=False, encoding='utf-8-sig')

# 打印结果
print(results_df)
