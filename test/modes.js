//check to see whether the Contracts Modes work with four different testing contracts

var MoonCatRescue = artifacts.require("./MoonCatRescue.sol");

/* List of MoonCat seeds and corresponding catIds for Test Mode

"0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237":"0x00738ea43a"
"0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02":"0x00661a3341"

*/

//check to see if Inactive Mode works

contract('MoonCatRescue - Inactive Mode', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MoonCatRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();

	//searchSeed should be set to 0x0
	checkSearchSeed(0x0);

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);
	
	//try to call addGenesisCatGroup from contract owner account before mode is changed - should fail
	addGenesisCatGroupFromAccount(0, "expect to fail");
	
	//try to call addGenesisCatGroup from non contract owner account before mode is changed - should fail	
	addGenesisCatGroupFromAccount(1, "expect to fail");
	
	//try to rescue MoonCat from contract owner account before mode is changed - should fail
	rescueCatFromAccount(0, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");
	
	//try to rescue MoonCat from non contract owner account before mode is changed - should fail
	rescueCatFromAccount(1, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");
	
	//searchSeed should be set to 0x0
	checkSearchSeed(0x0);

	//contract should still be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();
});






//check to see if disableBeforeActivation works

contract('MoonCatRescue - Disabled Mode', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MoonCatRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();

	//searchSeed should be set to 0x0
	checkSearchSeed(0x0);

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to disableBeforeActivation by non contract owner - should fail
	changeModeToDisabled(1, "expect to fail");	

	//contract should still be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to disableBeforeActivation by contract owner
	changeModeToDisabled(0);

	//contract should be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to activateInTestMode after disableBeforeActivation is called as contract owner - should fail
	changeModeToTest(0, "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to activateInTestMode after disableBeforeActivation is called by non contract owner - should fail
	changeModeToTest(1, "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to activateInTestMode after disableBeforeActivation is called as contract owner - should fail
	changeModeToLive(0, "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to activateInTestMode after disableBeforeActivation is called by non contract owner - should fail
	changeModeToLive(1, "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to call addGenesisCatGroup from contract owner account after disableBeforeActivation is called - should fail
	addGenesisCatGroupFromAccount(0, "expect to fail");
	
	//try to call addGenesisCatGroup from non contract owner account after disableBeforeActivation is called - should fail	
	addGenesisCatGroupFromAccount(1, "expect to fail");
	
	//try to rescue MoonCat from contract owner account after disableBeforeActivation is called - should fail
	rescueCatFromAccount(0, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");
	
	//try to rescue MoonCat from non contract owner account after disableBeforeActivation is called - should fail
	rescueCatFromAccount(1, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//searchSeed should still be set to 0x0
	checkSearchSeed(0x0);

	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();
});






//check to see if activateInTestMode works

contract('MoonCatRescue - Test Mode', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MoonCatRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();

	//searchSeed should still be set to 0x0
	checkSearchSeed(0x0);

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to activateInTestMode by non contract owner - should fail
	changeModeToTest(1, "expect to fail");	

	//contract should still be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to activateInTestMode by contract owner
	changeModeToTest(0);

	//searchSeed should be set to Test Mode value, "0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d"
	checkSearchSeed("0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d");

	//contract should be in test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to disableBeforeActivation after activateInTestMode is called, as contract owner - should fail
	changeModeToDisabled(0, "expect to fail");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to disableBeforeActivation after activateInTestMode is called, as non contract owner - should fail
	changeModeToDisabled(1, "expect to fail");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to activate after activateInTestMode is called, as contract owner - should fail
	changeModeToLive(0, "expect to fail");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to activate after activateInTestMode is called, as non contract owner - should fail
	changeModeToLive(1, "expect to fail");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to call addGenesisCatGroup from contract owner account after activateInTestMode is called
	addGenesisCatGroupFromAccount(0);
	checkRemainingGenesisCats(240);

	//try to call addGenesisCatGroup from non contract owner account after activateInTestMode is called - should fail
	addGenesisCatGroupFromAccount(1, "expect to fail");
	checkRemainingGenesisCats(240);
	
	//try to rescue MoonCat from contract owner account after activateInTestMode is called
	rescueCatFromAccount(0, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237");
	checkCatOwner(0, "0x00738ea43a");
	
	//try to rescue MoonCat from non contract owner account after activateInTestMode is called
	rescueCatFromAccount(1, "0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02");
	checkCatOwner(1, "0x00661a3341");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//searchSeed should still be set to Test Mode value, "0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d"
	checkSearchSeed(0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d);

	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();
});






//check to see if activate works

contract('MoonCatRescue - Live Mode', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MoonCatRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();

	//searchSeed should still be set to 0x0
	checkSearchSeed(0x0);

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to activate by non contract owner - should fail
	changeModeToLive(1, "expect to fail");

	//contract should still be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to activate by contract owner
	changeModeToLive(0);	

	//contract should be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to activateInTestMode after activate is called by contract owner - should fail
	changeModeToTest(1, "expect to fail");

	//contract should still be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to activateInTestMode after activate is called by non contract owner - should fail
	changeModeToTest(1, "expect to fail");

	//contract should still be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to disableBeforeActivation after activate is called by contract owner - should fail
	changeModeToDisabled(0, "expect to fail");

	//contract should still be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to disableBeforeActivation after activate is called by non contract owner - should fail
	changeModeToDisabled(1, "expect to fail");

	//contract should still be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to call addGenesisCatGroup from contract owner account after activate is called
	addGenesisCatGroupFromAccount(0);
	checkRemainingGenesisCats(240);

	//try to call addGenesisCatGroup from non contract owner account after activate is called - should fail
	addGenesisCatGroupFromAccount(1, "expect to fail");
	checkRemainingGenesisCats(240);

	//contract should stilll be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();
});