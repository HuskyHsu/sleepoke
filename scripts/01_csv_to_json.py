import json
import os

def is_number(s):
    try:
        int(s)
        return True
    except ValueError:
        return False

def csv_to_json(csv_data):
    lines = csv_data.strip().split('\n')
    header = lines[0].split(',')
    header = [col.strip().lower().replace(' ', '_') for col in header]
    excluded_columns = ['image_list', 'image', 'image_shiny']

    data = []
    for line in lines[1:]:
        values = line.split(',')
        obj = {}

        for i, col in enumerate(header):
            column_value = values[i].strip()

            if col not in excluded_columns:
                if '_' in col:
                    prefix, suffix = col.split('_', 1)
                    if suffix.isdigit():
                        obj[prefix] = obj.get(prefix, [])
                        if column_value:
                            obj[prefix].append(column_value)
                    else:
                        obj[col] = int(column_value) if is_number(column_value) else column_value
                else:
                    obj[col] = int(column_value) if is_number(column_value) else column_value

        data.append(obj)

    return json.dumps(data)


if __name__ == "__main__":
    csv_file_path = 'sleep - PM_list.csv'

    with open(csv_file_path, 'r', encoding='utf-8') as file:
        csv_data = file.read()
        json_data = csv_to_json(csv_data)
        # print(json_data)

    output_folder = '../public/data/'  # 請替換成您要輸出的資料夾路徑


    output_file_path = os.path.join(output_folder, 'pmList.json')
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        output_file.write(json_data)