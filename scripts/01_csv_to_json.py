import json
import os

import requests


def is_number(s):
    try:
        int(s)
        return True
    except ValueError:
        return False


def download_images(data, output_folder):
    image_list_column = "image_list"

    for item in data:
        if image_list_column in item:
            image_list = item[image_list_column]
            for index, image_url in enumerate(image_list, start=1):
                image_filename = f"image_{index}.jpg"
                image_filepath = os.path.join(output_folder, image_filename)
                download_image(image_url, image_filepath)


def download_image(url, filepath):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filepath, "wb") as f:
            f.write(response.content)
    else:
        print(url, response.status_code)


def csv_to_json(csv_data, locations):
    lines = csv_data.strip().split("\n")
    header = lines[0].split(",")
    header = [col.strip().lower().replace(" ", "_") for col in header]
    excluded_columns = ["image_list", "image", "image_shiny"]

    data = []
    for j, line in enumerate(lines[1:]):
        values = line.split(",")
        print(values[0])
        obj = {}

        for i, col in enumerate(header):
            if "location" in col:
                continue

            column_value = values[i].strip()

            if col not in excluded_columns:
                if "_" in col:
                    prefix, suffix = col.split("_", 1)
                    if suffix.isdigit():
                        obj[prefix] = obj.get(prefix, [])
                        if column_value:
                            obj[prefix].append(column_value)
                    else:
                        obj[col] = (
                            int(column_value)
                            if is_number(column_value)
                            else column_value
                        )
                else:
                    obj[col] = (
                        int(column_value) if is_number(column_value) else column_value
                    )
            else:
                continue
                # if col == "image_list":
                #     download_image(
                #         f"https://www.serebii.net/pokemonsleep/pokemon/sleep/{int(values[0][-3:])}.png",
                #         f"../public/image/sleep/{values[0][-3:]}.png"
                #     )
                # if col == "image":
                #     download_image(
                #         f"https://www.serebii.net/pokemonsleep/pokemon/drowse/{int(values[0][-3:])}.png",
                #         f"../public/image/drowse/{values[0][-3:]}.png"
                #     )
                # if col == "image_list":
                #     download_image(
                #         column_value, f"../public/image/pmList/{values[0][-3:]}.png"
                #     )
                # elif col == "image":
                #     download_image(
                #         column_value, f"../public/image/pm/{values[0][-3:]}.png"
                #     )
                # elif col == "image_shiny":
                #     download_image(
                #         column_value, f"../public/image/pm/{values[0][-3:]}_s.png"
                #     )

        obj["locations"] = locations[j]["locations"]
        data.append(obj)

    return json.dumps(data, indent=2)


if __name__ == "__main__":
    csv_file_path = "sleep - PM_list.csv"
    json_file_path = "pmLocations.json"

    with open(json_file_path, "r", encoding="utf-8") as json_file:
        data = json.load(json_file)

    with open(csv_file_path, "r", encoding="utf-8") as file:
        csv_data = file.read()
        json_data = csv_to_json(csv_data, data)
        # print(json_data)

    output_folder = "../src/data/"

    output_file_path = os.path.join(output_folder, "pmList.json")
    with open(output_file_path, "w", encoding="utf-8") as output_file:
        output_file.write(json_data)
