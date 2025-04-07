import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt1/expt1_data/*.csv')  # 选择目录和文件类型

# 处理每个文件
def process_file(file_path):
    data = pd.read_csv(file_path, header=None)

    if str(data.iloc[0, 12]) == 'attentionStimuli':
        print(f"在文件 {file_path} 找到 attentionStimuli，进行列的平移操作。")

        num_columns = data.shape[1]
        if num_columns < 25:
            # 添加空列，直到数据框有 25 列
            for i in range(25 - num_columns):
                data[i + num_columns] = None

        # 先将原本的16、17、18、19、20列数据移动到21、22、23、24、25列
        data.iloc[:, 24] = data.iloc[:, 19]
        data.iloc[:, 23] = data.iloc[:, 18]
        data.iloc[:, 22] = data.iloc[:, 17]
        data.iloc[:, 21] = data.iloc[:, 16]
        data.iloc[:, 20] = data.iloc[:, 15]

        # 然后将第13、14、15列数据移动到18、19、20列
        data.iloc[:, 17] = data.iloc[:, 12]
        data.iloc[:, 18] = data.iloc[:, 13]
        data.iloc[:, 19] = data.iloc[:, 14]

        # 最后将第21、22、23、24、25列的数据移动到第13、14、15、16、17列
        data.iloc[:, 12] = data.iloc[:, 20]
        data.iloc[:, 13] = data.iloc[:, 21]
        data.iloc[:, 14] = data.iloc[:, 22]
        data.iloc[:, 15] = data.iloc[:, 23]
        data.iloc[:, 16] = data.iloc[:, 24]

        # 删除原本的第21、22、23、24、25列（索引为20, 21, 22, 23, 24）
        data = data.drop(columns=[20, 21, 22, 23, 24])

        # 保存修改后的文件到原路径
        data.to_csv(file_path, index=False, header=False, encoding='utf-8-sig')
        print(f"文件已保存为：{file_path}")
    else:
        print(f"在文件 {file_path} 中，第一行第13列的值不是 attentionStimuli，跳过该文件。")

# 处理所有 CSV 文件
for file_path in file_paths:
    print(f"\n正在处理文件：{file_path}")
    process_file(file_path)