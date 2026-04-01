import re
import json

with open('src/lib/pokemon-data.ts', 'r') as f:
    content = f.read()
    lines = content.split('\n')

# Find all move entries missing "description"
# Pattern: a block starting with { containing name, type, category, power, accuracy, pp but no description before }
i = 0
fixes = []
while i < len(lines):
    stripped = lines[i].strip()
    if stripped == '{':
        # Look ahead for a move block (has "name", "type", etc.)
        j = i + 1
        block_lines = [i]
        has_name = False
        has_pp = False
        has_description = False
        name_val = ""
        while j < len(lines):
            s = lines[j].strip()
            block_lines.append(j)
            if '"name"' in s:
                has_name = True
                m = re.search(r'"name":\s*"(.+?)"', s)
                if m:
                    name_val = m.group(1)
            if '"pp"' in s:
                has_pp = True
            if '"description"' in s:
                has_description = True
            if s == '}' or s == '},':
                break
            j += 1
        if has_name and has_pp and not has_description:
            # Find the pp line to add description after it
            for bl in block_lines:
                if '"pp"' in lines[bl]:
                    fixes.append((bl, name_val))
                    break
    i += 1

print(f"Found {len(fixes)} moves missing description:")
for line_num, name in fixes:
    print(f"  Line {line_num + 1}: {name}")

# Move descriptions from engine or generic
DESCRIPTIONS = {
    "Fake Out": "A move that hits first and makes the target flinch. Only works on the first turn.",
    "Follow Me": "The user draws attention to itself, making all targets take aim only at the user.",
    "Sucker Punch": "Enables the user to attack first. Fails if the target is not readying an attack.",
    "Iron Head": "The foe slams the target with its steel-hard head. It may also make the target flinch.",
    "King's Shield": "Protects the user from attacks. Lowers Attack of any attacker that makes contact.",
    "Psychic": "Has a good chance of lowering SP. DEF.",
    "Aqua Jet": "The user lunges at the target at a speed that makes it almost invisible. It is sure to strike first.",
    "Belly Drum": "Maximizes ATTACK while sacrificing HP.",
    "Head Smash": "The user attacks with a hazardous, full-power headbutt. The user also takes terrible damage.",
    "Ice Beam": "An attack that may freeze the foe.",
    "Play Rough": "The user plays rough with the target and attacks it. This may also lower the target's Attack stat.",
    "Flamethrower": "Has a good chance of burning the foe.",
    "Shadow Ball": "An attack that may lower SP. DEF.",
    "Thunderbolt": "Has a good chance of paralyzing the foe.",
    "Energy Ball": "The user draws power from nature and fires it at the foe. It may also lower the target's Sp. Def.",
    "Moonblast": "Borrowing the power of the moon, the user attacks the target. This may also lower the target's Sp. Atk stat.",
    "Sludge Bomb": "An attack that may poison the foe.",
    "Focus Blast": "The user heightens its mental focus and unleashes its power. It may also lower the target's Sp. Def.",
    "Aura Sphere": "The user lets loose a blast of aura power from deep within its body at the target. This attack never misses.",
    "Close Combat": "The user fights the target up close without guarding itself. It also cuts the user's Defense and Sp. Def.",
    "Extreme Speed": "An extremely fast and powerful attack that always strikes first.",
    "Knock Off": "The user slaps down the foe's held item, preventing the item from being used during the battle.",
    "U-turn": "After making its attack, the user rushes back to switch places with a party Pokémon in waiting.",
    "Volt Switch": "After making its attack, the user rushes back to switch places with a party Pokémon in waiting.",
    "Rapid Spin": "A spin attack that also removes traps and raises user's Speed.",
    "Scald": "The user shoots boiling hot water at its target. It may also leave the target with a burn.",
    "Stealth Rock": "The user lays a trap of levitating stones around the foe. The trap hurts foes that switch into battle.",
    "Toxic": "A move that badly poisons the foe.",
    "Will-O-Wisp": "A sinister move that inflicts a burn on the foe.",
    "Thunder Wave": "A move that may cause paralysis.",
    "Spore": "A move that induces sleep.",
    "Seed Bomb": "The user slams a barrage of hard-shelled seeds down on the target from above.",
    "Leaf Blade": "The user handles a sharp leaf like a sword and attacks by cutting its target. Critical hits land more easily.",
    "Power Whip": "The user violently whirls its vines or tentacles to harshly lash the foe.",
    "Shed Tail": "Creates a substitute using 50% of max HP, then switches out.",
    "Parting Shot": "With a parting threat, the user lowers the target's Attack and Sp. Atk stats. Then it switches with a party Pokémon.",
    "Trick Room": "The user creates a bizarre area in which slower Pokémon get to move first for five turns.",
    "Tailwind": "The user whips up a turbulent whirlwind that ups the Speed of all party Pokémon for four turns.",
    "Ally Switch": "The user teleports using a strange power and switches places with one of its allies.",
    "After You": "The user helps the target and makes it use its move right after the user.",
    "Encore": "Makes the foe repeat its last move for 2 to 6 turns.",
    "Dragon Pulse": "The target is attacked with a shock wave generated by the user's gaping mouth.",
    "Dark Pulse": "The user releases a horrible aura imbued with dark thoughts. It may also make the target flinch.",
    "Dazzling Gleam": "The user damages opposing Pokémon by emitting a powerful flash.",
    "Heat Wave": "Exhales a hot breath on the foe. May also burn.",
    "Hydro Pump": "Blasts water at high pressure to hit the foe.",
    "Surf": "A big wave crashes down on the foe. Can also be used for crossing water.",
    "Overheat": "Allows a full-power attack, but sharply lowers SP. ATK.",
    "Fire Blast": "Has a good chance of burning the foe.",
    "Brick Break": "An attack that also breaks barriers such as Light Screen and Reflect.",
    "Mach Punch": "A punch thrown at blinding speed. It is certain to strike first.",
    "Bullet Punch": "The user strikes the target with tough punches as fast as bullets. This move always goes first.",
    "Ice Shard": "The user flash-freezes chunks of ice and hurls them at the target. This move always goes first.",
    "Shadow Sneak": "The user extends its shadow and attacks the target from behind. This move always goes first.",
    "Quick Attack": "An attack that always strikes first.",
    "Grassy Glide": "Gliding on the ground, the user attacks the target. This move always goes first on Grassy Terrain.",
}

if fixes:
    # Apply fixes from bottom to top to preserve line numbers
    for line_num, name in reversed(fixes):
        desc = DESCRIPTIONS.get(name, f"A move called {name}.")
        pp_line = lines[line_num]
        # Remove trailing comma if present, we'll add description after
        if pp_line.rstrip().endswith(','):
            # Already has comma, just add description line after
            indent = len(pp_line) - len(pp_line.lstrip())
            indent_str = ' ' * indent
            desc_line = f'{indent_str}"description": "{desc}"'
            lines.insert(line_num + 1, desc_line)
        else:
            # Add comma to pp line and then description
            lines[line_num] = pp_line.rstrip() + ','
            indent = len(pp_line) - len(pp_line.lstrip())
            indent_str = ' ' * indent
            desc_line = f'{indent_str}"description": "{desc}"'
            lines.insert(line_num + 1, desc_line)
        print(f"  Fixed: {name} at line {line_num + 1}")

    with open('src/lib/pokemon-data.ts', 'w') as f:
        f.write('\n'.join(lines))
    
    print(f"\nFixed {len(fixes)} entries.")
else:
    print("No fixes needed.")
