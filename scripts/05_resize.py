from PIL import Image


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
