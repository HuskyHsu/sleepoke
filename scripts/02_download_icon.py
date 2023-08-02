import requests
import os


def download_images(image_urls, save_directory):
    if not os.path.exists(save_directory):
        os.makedirs(save_directory)

    for url in image_urls:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                file_name = url.split("/")[-1]  # 取得url中的檔名部分作為檔案名稱
                file_path = os.path.join(save_directory, file_name)

                with open(file_path, "wb") as f:
                    f.write(response.content)

                print(f"圖片 {file_name} 下載成功")
            else:
                print(f"無法下載圖片 {url} - 狀態碼: {response.status_code}")
        except Exception as e:
            print(f"發生錯誤：{e}，無法下載圖片 {url}")


# 測試程式碼
if __name__ == "__main__":
    image_urls = [
        "https://www.serebii.net/pokemonsleep/ingredients/largeleek.png",
        "https://www.serebii.net/pokemonsleep/ingredients/tastymushroom.png",
        "https://www.serebii.net/pokemonsleep/ingredients/fancyegg.png",
        "https://www.serebii.net/pokemonsleep/ingredients/softpotato.png",
        "https://www.serebii.net/pokemonsleep/ingredients/fancyapple.png",
        "https://www.serebii.net/pokemonsleep/ingredients/fieryherb.png",
        "https://www.serebii.net/pokemonsleep/ingredients/beansausage.png",
        "https://www.serebii.net/pokemonsleep/ingredients/moomoomilk.png",
        "https://www.serebii.net/pokemonsleep/ingredients/honey.png",
        "https://www.serebii.net/pokemonsleep/ingredients/pureoil.png",
        "https://www.serebii.net/pokemonsleep/ingredients/warmingginger.png",
        "https://www.serebii.net/pokemonsleep/ingredients/snoozytomato.png",
        "https://www.serebii.net/pokemonsleep/ingredients/soothingcacao.png",
        "https://www.serebii.net/pokemonsleep/ingredients/slowpoketail.png",
        "https://www.serebii.net/pokemonsleep/ingredients/greengrasssoybeans.png",
    ]

    save_directory = "../public/image/ingredients"
    download_images(image_urls, save_directory)
