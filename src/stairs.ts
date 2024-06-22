export function buildStairs(loc: org.bukkit.Location, count: number, material: org.bukkit.Material) {
    for (let i = 0; i < count; i++) {
        for (let x = -4; x <= 4; x++) {
            loc.getWorld()?.getBlockAt(loc.getBlockX() + x, loc.getBlockY(), loc.getBlockZ()).setType(material);
        }
        loc.add(0, 1, -1);
    }
}
