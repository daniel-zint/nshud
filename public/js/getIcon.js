const weapon_icons = {
    ak47: "icons/ak47.png",
    kevlar: "icons/armor.png",
    kevlar_helmet: "icons/armor-helmet.png",
    aug: "icons/aug.png",
    awp: "icons/awp.png",
    bizon: "icons/bizon.png",
    bomb: "icons/bomb.png",
    c4: "icons/c4.png",
    cz75a: "icons/cz75a.png",
    ct: "icons/ct.png",
    deagle: "icons/deagle.png",
    decoy: "icons/decoy.png",
    kit: "icons/defuser.png",
    elite: "icons/elite.png",
    famas: "icons/famas.png",
    fiveseven: "icons/fiveseven.png",
    flashbang: "icons/flashbang.png",
    g3sg1: "icons/g3sg1.png",
    galilar: "icons/galilar.png",
    glock: "icons/glock.png",
    hegrenade: "icons/hegrenade.png",
    health: "icons/health.png",
    hkp2000: "icons/hkp2000.png",
    incgrenade: "icons/incgrenade.png",
    m4a1_silencer: "icons/m4a1_silencer.png",
    m4a1: "icons/m4a4.png",
    m249: "icons/m249.png",
    mac10: "icons/mac10.png",
    mag7: "icons/mag7.png",
    molotov: "icons/molotov.png",
    money: "icons/money.png",
    mp5sd: "icons/mp5sd.png",
    mp7: "icons/mp7.png",
    mp9: "icons/mp9.png",
    negev: "icons/negev.png",
    no_symbol: "icons/no_symbol.png",
    nova: "icons/nova.png",
    p90: "icons/p90.png",
    p250: "icons/p250.png",
    revolver: "icons/revolver.png",
    sawedoff: "icons/sawedoff.png",
    scar20: "icons/scar20.png",
    skull: "icons/skull.png",
    sg556: "icons/sg556.png",
    smokegrenade: "icons/smokegrenade.png",
    ssg08: "icons/ssg08.png",
    t: "icons/t.png",
    taser: "icons/taser.png",
    tec9: "icons/tec9.png",
    ump45: "icons/ump45.png",
    usp_silencer: "icons/usp_silencer.png",
    xm1014: "icons/xm1014.png"
};

function getIcon(key, right2left = false) {
    if (typeof (key) !== "string") {
        console.warn(`getIcon was called with wrong type.\nkey=${key}`);
        return document.createTextNode(`?`);
    }
    let name = key.replace("weapon_", "");
    let img;
    if (name in weapon_icons) {
        img = document.createElement("img");
        img.src = weapon_icons[name];
        if (right2left) {
            img.style.transform = 'scaleX(-1)';
        }
    } else {
        img = document.createTextNode(`${name}`);
    }

    return img;
}