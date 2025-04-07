import pandas as pd
import glob
import os

# 获取所有 CSV 文件路径
file_paths = glob.glob('C:/analysis/expt2/expt2_data/*.csv')  # 选择目录和文件类型

# 处理每个文件
def process_file(file_path):
    # 读取文件，关闭标题行
    data = pd.read_csv(file_path, header=None)

    # 检查第1行第13列的值
    if str(data.iloc[0, 12]) == 'attentionStimuli':  # 第13列是索引12
        print(f"在文件 {file_path} 找到 attentionStimuli，进行列的平移操作。")

        # 确保数据框有足够的列
        num_columns = data.shape[1]
        if num_columns < 25:
            # 添加空列，直到数据框有 25 列
            for i in range(25 - num_columns):
                data[i + num_columns] = None

        # 先将原本的16、17、18、19、20列数据移动到21、22、23、24、25列
        data.iloc[:, 24] = data.iloc[:, 19]  # 第20列移动到第25列
        data.iloc[:, 23] = data.iloc[:, 18]  # 第19列移动到第24列
        data.iloc[:, 22] = data.iloc[:, 17]  # 第18列移动到第23列
        data.iloc[:, 21] = data.iloc[:, 16]  # 第17列移动到第22列
        data.iloc[:, 20] = data.iloc[:, 15]  # 第16列移动到第21列

        # 然后将第13、14、15列数据移动到18、19、20列
        data.iloc[:, 17] = data.iloc[:, 12]  # 第13列移动到第18列
        data.iloc[:, 18] = data.iloc[:, 13]  # 第14列移动到第19列
        data.iloc[:, 19] = data.iloc[:, 14]  # 第15列移动到第20列

        # 最后将第21、22、23、24、25列的数据移动到第13、14、15、16、17列
        data.iloc[:, 12] = data.iloc[:, 20]  # 第21列数据移动到第13列
        data.iloc[:, 13] = data.iloc[:, 21]  # 第22列数据移动到第14列
        data.iloc[:, 14] = data.iloc[:, 22]  # 第23列数据移动到第15列
        data.iloc[:, 15] = data.iloc[:, 23]  # 第24列数据移动到第16列
        data.iloc[:, 16] = data.iloc[:, 24]  # 第25列数据移动到第17列

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
