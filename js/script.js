document.getElementById("split").addEventListener("click", splitLoot);
document.getElementById("remove").addEventListener("click", removeLoot);
document.getElementById("add").addEventListener("click", addLoot);

// Intial variable setting
const items = [];

let totalLootValue = 0;
let warningText = "";
let lootText = "";

let totalPartyMembers = 0;
let partyLootSplit = 0;
let partyWarning = "";

document.getElementById("lootSplit").innerHTML = `Loot Per Party Member: 0`;
document.getElementById("totalSplit").innerHTML = `Total Loot: 0`;
document.getElementById("total").innerHTML = `Total Loot: 0`;
document.getElementById("loot").innerHTML = "None";

function splitLoot()
{
    totalPartyMembers = parseFloat(document.getElementById("party").value);

    // Checks in sequence if the party member amount is valid
    if (isNaN(totalPartyMembers)) { partyWarning = "Party number is missing or invalid"; }
    else if (totalPartyMembers < 1) { partyWarning = "Party number can't be zero or negative"; }
    else if (totalPartyMembers % 1 != 0) { partyWarning = "Party number must be a whole number"; }
    else if (items.length < 1) { partyWarning = "There is no loot to split"; }
    else
    {
        // if valid it hides the warning and splits then displays
        partyWarning = ""
        partyLootSplit = totalLootValue / totalPartyMembers;
        document.getElementById("lootSplit").innerHTML = `Loot Per Party Member: ${partyLootSplit.toFixed(2)}`;
    }

    document.getElementById("partyWarning").innerHTML = partyWarning;
}

function addLoot()
{
    // gets and sets the item inserted
    let itemName = document.getElementById("name").value;
    let itemValue = parseFloat(document.getElementById("itemValue").value);

    // Validation sequence that checks valid name and valid value
    if (itemName === "") { warningText = "A loot name is required"; }
    else if (isNaN(itemValue)) { warningText = "Loot value is not valid"; }
    else if (itemValue < 0) { warningText = "Loot value cannot be negative"; }
    else
    {
        // hides warning text and creates and adds valid item to array
        warningText = "";
        let newItem = {name: itemName, value: itemValue};
        items.push(newItem);

        renderLoot();
    }  

    document.getElementById("warning").innerHTML = warningText;
}

// Bonus: the most added loot can be removed via button. Additionally, it checks for available loot
function removeLoot()
{
    // checks if there is an item to remove
    if (items.length > 0)
    {
        // hides warning and then removes most recent added item. Then renders loot again
        warningText = "";
        items.splice(items.length - 1, 1);
        renderLoot();
    }
    else { warningText = "There is no loot to remove"; }

    document.getElementById("warning").innerHTML = warningText;
}

function renderLoot()
{
    // loop that refreshes the loot list and adds new item
    lootText = "";
    if (items.length > 0)
    {
        for (let i = 0; i < items.length; i++)
        {
            lootText += `[${i + 1}]\t ${items[i].name}\t -\t ${items[i].value.toFixed(2)}\n`;
        }
    }
    else { lootText = "None"; }

    // second loop that adds up value. For readability could be combined with loop above
    totalLootValue = 0;
    for (let i = 0; i < items.length; i++)
    {
        totalLootValue += parseFloat(items[i].value);
    }

    // Bonus: This automatically updates the loot split. However, if the party size was recently changed it will avoid updating in case party isn't valid
    if (totalPartyMembers === parseFloat(document.getElementById("party").value))
    {
        if (items.length > 0) { splitLoot(); }
        else { document.getElementById("lootSplit").innerHTML = `Loot Per Party Member: 0`; }
    }

    // updates all html text
    document.getElementById("totalSplit").innerHTML = `Total Loot: ${totalLootValue.toFixed(2)}`;
    document.getElementById("total").innerHTML = `Total Loot: ${totalLootValue.toFixed(2)}`;
    document.getElementById("loot").innerHTML = lootText;
}