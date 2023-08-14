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
        "https://www.serebii.net/pokemonsleep/meals/mixedcurry.png",
        "https://www.serebii.net/pokemonsleep/meals/fancyapplecurry.png",
        "https://www.serebii.net/pokemonsleep/meals/grilledtailcurry.png",
        "https://www.serebii.net/pokemonsleep/meals/solarpowertomatocurry.png",
        "https://www.serebii.net/pokemonsleep/meals/dreameaterbuttercurry.png",
        "https://www.serebii.net/pokemonsleep/meals/spicyleekcurry.png",
        "https://www.serebii.net/pokemonsleep/meals/sporemushroomcurry.png",
        "https://www.serebii.net/pokemonsleep/meals/eggbombcurry.png",
        "https://www.serebii.net/pokemonsleep/meals/heartycheeseburgercurry.png",
        "https://www.serebii.net/pokemonsleep/meals/softpotatochowder.png",
        "https://www.serebii.net/pokemonsleep/meals/simplechowder.png",
        "https://www.serebii.net/pokemonsleep/meals/beanburgercurry.png",
        "https://www.serebii.net/pokemonsleep/meals/mildhoneycurry.png",
        "https://www.serebii.net/pokemonsleep/meals/ninjacurry.png",
        "https://www.serebii.net/pokemonsleep/meals/droughtkatsucurry.png",
        "https://www.serebii.net/pokemonsleep/meals/meltyomelettecurry.png",
        "https://www.serebii.net/pokemonsleep/meals/bulkupbeancurry.png",
        "https://www.serebii.net/pokemonsleep/meals/mixedsalad.png",
        "https://www.serebii.net/pokemonsleep/meals/slowpoketailpeppersalad.png",
        "https://www.serebii.net/pokemonsleep/meals/sporemushroomsalad.png",
        "https://www.serebii.net/pokemonsleep/meals/snowcloakcaesarsalad.png",
        "https://www.serebii.net/pokemonsleep/meals/gluttonypotatosalad.png",
        "https://www.serebii.net/pokemonsleep/meals/waterveiltofusalad.png",
        "https://www.serebii.net/pokemonsleep/meals/superpowerextremesalad.png",
        "https://www.serebii.net/pokemonsleep/meals/beanhamsalad.png",
        "https://www.serebii.net/pokemonsleep/meals/snoozytomatosalad.png",
        "https://www.serebii.net/pokemonsleep/meals/moomoocapresesalad.png",
        "https://www.serebii.net/pokemonsleep/meals/contrarychocolatemeatsalad.png",
        "https://www.serebii.net/pokemonsleep/meals/overheatgingersalad.png",
        "https://www.serebii.net/pokemonsleep/meals/fancyapplesalad.png",
        "https://www.serebii.net/pokemonsleep/meals/immunityleeksalad.png",
        "https://www.serebii.net/pokemonsleep/meals/dazzlingapplecheesesalad.png",
        "https://www.serebii.net/pokemonsleep/meals/ninjasalad.png",
        "https://www.serebii.net/pokemonsleep/meals/heatwavetofusalad.png",
        "https://www.serebii.net/pokemonsleep/meals/mixedjuice.png",
        "https://www.serebii.net/pokemonsleep/meals/fluffysweetpotatoes.png",
        "https://www.serebii.net/pokemonsleep/meals/steadfastgingercookies.png",
        "https://www.serebii.net/pokemonsleep/meals/fancyapplejuice.png",
        "https://www.serebii.net/pokemonsleep/meals/craftsodapop.png",
        "https://www.serebii.net/pokemonsleep/meals/embergingertea.png",
        "https://www.serebii.net/pokemonsleep/meals/jigglypuff'sfruityflan.png",
        "https://www.serebii.net/pokemonsleep/meals/lovelykisssmoothie.png",
        "https://www.serebii.net/pokemonsleep/meals/luckychantapplepie.png",
        "https://www.serebii.net/pokemonsleep/meals/neroli'srestorativetea.png",
        "https://www.serebii.net/pokemonsleep/meals/sweetscentchocolatecake.png",
        "https://www.serebii.net/pokemonsleep/meals/warmmoomoomilk.png",
        "https://www.serebii.net/pokemonsleep/meals/cloudninesoycake.png",
        "https://www.serebii.net/pokemonsleep/meals/hustleproteinsmoothie.png",
        "https://www.serebii.net/pokemonsleep/meals/stalwartvegetablejuice.png",
        "https://www.serebii.net/pokemonsleep/meals/bigmalasada.png",
        "https://www.serebii.net/pokemonsleep/meals/hugepowersoydonuts.png",
    ]

    save_directory = "../public/image/meals"
    download_images(image_urls, save_directory)
