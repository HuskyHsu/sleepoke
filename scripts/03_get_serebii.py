import json
import os
import requests
from bs4 import BeautifulSoup

list = [
    "bulbasaur",
    "ivysaur",
    "venusaur",
    "charmander",
    "charmeleon",
    "charizard",
    "squirtle",
    "wartortle",
    "blastoise",
    "caterpie",
    "metapod",
    "butterfree",
    "rattata",
    "raticate",
    "ekans",
    "arbok",
    "pikachu",
    "raichu",
    "clefairy",
    "clefable",
    "jigglypuff",
    "wigglytuff",
    "diglett",
    "dugtrio",
    "meowth",
    "persian",
    "psyduck",
    "golduck",
    "mankey",
    "primeape",
    "growlithe",
    "arcanine",
    "bellsprout",
    "weepinbell",
    "victreebel",
    "geodude",
    "graveler",
    "golem",
    "slowpoke",
    "slowbro",
    "magnemite",
    "magneton",
    "doduo",
    "dodrio",
    "gastly",
    "haunter",
    "gengar",
    "cubone",
    "marowak",
    "kangaskhan",
    "mr.mime",
    "pinsir",
    "ditto",
    "eevee",
    "vaporeon",
    "jolteon",
    "flareon",
    "chikorita",
    "bayleef",
    "meganium",
    "cyndaquil",
    "quilava",
    "typhlosion",
    "totodile",
    "croconaw",
    "feraligatr",
    "pichu",
    "cleffa",
    "igglybuff",
    "togepi",
    "togetic",
    "mareep",
    "flaaffy",
    "ampharos",
    "sudowoodo",
    "espeon",
    "umbreon",
    "slowking",
    "wobbuffet",
    "heracross",
    "houndour",
    "houndoom",
    "larvitar",
    "pupitar",
    "tyranitar",
    "slakoth",
    "vigoroth",
    "slaking",
    "sableye",
    "gulpin",
    "swalot",
    "swablu",
    "altaria",
    "absol",
    "wynaut",
    "spheal",
    "sealeo",
    "walrein",
    "bonsly",
    "mimejr.",
    "riolu",
    "lucario",
    "croagunk",
    "toxicroak",
    "magnezone",
    "togekiss",
    "leafeon",
    "glaceon",
    "sylveon",
]

areaMap = {
    "Greengrass Isle": "萌綠之島",
    "Cyan Beach": "天青沙灘",
    "Taupe Hollow": "灰褐洞窟",
    "Snowdrop Tundra": "白花雪原",
}

levelMap = {
    "Basic": "普通",
    "Great": "超級",
    "Ultra": "高級",
    "Master": "大師",
}

incense = {
    "萌綠之島": [
        "quilava",
        "bayleef",
        "arcanine",
        "flareon",
        "meganium",
        "typhlosion",
        "leafeon",
        "houndoom",
    ],
    "天青沙灘": [],
    "灰褐洞窟": [],
    "白花雪原": [],
}

if __name__ == "__main__":
    data = []
    for name in list[:]:
        url = f"https://www.serebii.net/pokemonsleep/pokemon/{name}.shtml"
        response = requests.get(url)

        soup = BeautifulSoup(response.text, "html.parser")

        locations_tds = soup.findAll("td", class_="fooinfo", valign="top")

        print(name)

        locations_info = {}

        for j, locations_td in enumerate(locations_tds):
            # subLocation = []
            if locations_td:
                s = [
                    child.text.replace(" - From ", "")
                    for child in locations_td.contents
                    if not child.text in ["", "Locations"]
                ]

                for i in range(0, len(s), 2):
                    if s[i + 1] == " - ":
                        continue
                    area = areaMap[s[i]]
                    level = levelMap[s[i + 1].split(" ")[0]]
                    subLevel = int(s[i + 1].split(" ")[1])

                    if not area in locations_info:
                        locations_info[area] = []

                    locations_info[area].append(
                        {"style": j, "level": level, "subLevel": subLevel}
                    )

                    # subLocation.append(
                    #     {
                    #         "area": areaMap[s[i]],
                    #         "level": levelMap[s[i + 1].split(" ")[0]],
                    #         "subLevel": int(s[i + 1].split(" ")[1]),
                    #     }
                    # )

                # locations_info.append(subLocation)

        # print(name, json.dumps(locations_info, indent=2, ensure_ascii=False))

        data.append({"name": name, "locations": locations_info})

    output_folder = "."

    output_file_path = os.path.join(output_folder, "pmLocations.json")
    with open(output_file_path, "w", encoding="utf-8") as output_file:
        output_file.write(json.dumps(data, indent=2))
