import os
from PIL import Image


def to_webP(folder):
    if not os.path.exists(folder):
        os.makedirs(folder)

    # 遍歷輸入資料夾中的所有檔案
    for filename in os.listdir(folder):
        if filename.endswith(".png"):
            # 打開PNG圖像
            with Image.open(os.path.join(folder, filename)) as img:
                # 構建輸出文件名，將原始檔案的副檔名替換為.webp
                output_filename = os.path.splitext(filename)[0] + ".webp"
                # 設定WebP的轉換選項，例如圖像品質（可選）
                img.save(os.path.join(folder, output_filename), "webp", quality=80)
                print(f"已轉換 {filename} 為 {output_filename}")

    print("所有PNG圖像已成功轉換為WebP格式。")


def resize_image(input_path, output_path, new_size):
    try:
        # 開啟圖片
        with Image.open(input_path) as img:
            # 調整大小
            img = img.resize(new_size)
            # 儲存圖片
            img.save(output_path)
        print(f"成功調整圖片大小並儲存到 {output_path}")
    except Exception as e:
        print(f"發生錯誤: {str(e)}")


for pid in [122, 439]:
    resize_image(
        f"sourceImg/pokemon_{pid}.png", f"../public/image/pmIcon/{pid}.png", (150, 150)
    )

    resize_image(
        f"sourceImg/pokemon_{pid}_.png", f"../public/image/pm/{pid}.png", (300, 273)
    )

    resize_image(
        f"sourceImg/pokemon_{pid}_shiny.png",
        f"../public/image/pm/{pid}_s.png",
        (300, 273),
    )

    resize_image(
        f"sourceImg/pokemon_{pid}_normal.png",
        f"../public/image/sleep/{pid}.png",
        (300, 273),
    )

    resize_image(
        f"sourceImg/pokemon_{pid}_drowse.png",
        f"../public/image/drowse/{pid}.png",
        (300, 273),
    )

to_webP("../public/image/pmIcon")


for filename in os.listdir("sourceImg/rare"):
    if filename.endswith("_rare.png"):
        pid = filename.split("_")[1].zfill(3)

        resize_image(
            f"sourceImg/rare/{filename}",
            f"../public/image/rare/{pid}.png",
            (300, 273),
        )
