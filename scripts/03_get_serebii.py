import json
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

if __name__ == "__main__":
    for name in list[6:7]:
        url = f"https://www.serebii.net/pokemonsleep/pokemon/{name}.shtml"
        response = requests.get(url)

        soup = BeautifulSoup(response.text, "html.parser")

        locations_tds = soup.findAll("td", class_="fooinfo", valign="top")

        # print(locations_td)

        locations_info = []

        for locations_td in locations_tds:
            subLocation = []
            if locations_td:
                s = [
                    child.text.replace(" - From ", "")
                    for child in locations_td.contents
                    if not child.text in ["", "Locations"]
                ]

                for i in range(0, len(s), 2):
                    subLocation.append({"area": areaMap[s[i]], "level": s[i + 1]})

                locations_info.append(subLocation)

        print(json.dumps(locations_info, indent=2, ensure_ascii=False))
