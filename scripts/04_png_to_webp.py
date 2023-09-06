import os
from PIL import Image

# 輸入資料夾路徑，包含PNG圖像檔案
input_folder = "../public/image/pmIcon"

# 輸出資料夾路徑，用於保存轉換後的WebP圖像
output_folder = "../public/image/pmIcon_webp"

if __name__ == "__main__":
    # 確保輸出資料夾存在，如果不存在則創建它
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 遍歷輸入資料夾中的所有檔案
    for filename in os.listdir(input_folder):
        if filename.endswith(".png"):
            # 打開PNG圖像
            with Image.open(os.path.join(input_folder, filename)) as img:
                # 構建輸出文件名，將原始檔案的副檔名替換為.webp
                output_filename = os.path.splitext(filename)[0] + ".webp"
                # 設定WebP的轉換選項，例如圖像品質（可選）
                img.save(
                    os.path.join(output_folder, output_filename), "webp", quality=80
                )
                print(f"已轉換 {filename} 為 {output_filename}")

    print("所有PNG圖像已成功轉換為WebP格式。")
