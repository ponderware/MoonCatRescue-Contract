//check to see if all of the functions work with Genesis MoonCats

var MoonCatRescue = artifacts.require("./MoonCatRescue.sol");

contract('MoonCatRescue - Test Genesis MoonCats', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MoonCatRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

/* List of rescued MoonCat seeds and corresponding catIds for Test Mode

"0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237":"0x00738ea43a"
"0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02":"0x00661a3341"

*/

//check that all starting parameters are correct

	//searchSeed should be set to 0x0 in Inactive Mode
	checkSearchSeed(0x0);


	//remainingCats and remainingGenesisCats should equal totalSupply
	checkAddsUpToTotalSupply();


	//should be 25344 remainingCats (non-genesis cats)
	checkRemainingCats(25344);


	//should be 256 remainingGenesisCats
	checkRemainingGenesisCats(256);


	//rescueIndex should be 0 before any cats are rescued or added
	checkRescueIndexValue(0);


	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();


	//account[0] should have a balance of 0
	checkAccountBalanceOf(0, 0);


	//account[0] should have a pendingWithdrawals of 0
	checkPendingWithdrawals(0, 0);


	//account[1] should have a balance of 0
	checkAccountBalanceOf(1, 0);


	//account[1] should have a pendingWithdrawals of 0
	checkPendingWithdrawals(1, 0);





//check to see if only contract owner can add Genesis MoonCats in Active Mode

	//try to call addGenesisCatGroup from a non-contract owner account before Activation - should fail
	addGenesisCatGroupFromAccount(1, "expect to fail");


	//try to call addGenesisCatGroup from contract owner account before activation - should fail
	addGenesisCatGroupFromAccount(0, "expect to fail");


	//try to activateInTestMode to set searchSeed when called as non contract owner - should fail
	changeModeToTest(1, "expect to fail");
	checkSearchSeed(0x0);


	//try to activateInTestMode to set searchSeed when called as contract owner
	changeModeToTest(0);
	checkSearchSeed(0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d)


	//try to call addGenesisCatGroup from non contract owner account after activation
	addGenesisCatGroupFromAccount(1, "expect to fail");
	checkRemainingGenesisCats(256);


	//try to call addGenesisCatGroup from contract owner account after activation
	addGenesisCatGroupFromAccount(0);
	checkRemainingGenesisCats(240);





//check to see if Genesis MoonCat Group was successfully added

	//rescueIndex should be 16 after 1 Genesis MoonCat Group is added
	checkRescueIndexValue(16);


	//should still be 25344 remainingCats after 1 Genesis MoonCat Group is added
	checkRemainingCats(25344);


	//totalSupply - remainingCats + remainingGenesisCats should equal rescueIndex
	checkRescueIndex();


	//should be 240 remainingGenesisCats
	checkRemainingGenesisCats(240);





//check to see if addGenesisCatGroup and rescueCat functions work together

	//try to rescueCat after searchSeed was set by activateInTestMode
	rescueCatFromAccount(1, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237");
	checkCatOwner(1, "0x00738ea43a");
	rescueCatFromAccount(1,"0x1111111111111111111111111111111111111111111111111111111111111111", "expect to fail");


	//account[1] should have a balance of 1 (MoonCats: "0x00738ea43a")
	checkAccountBalanceOf(1, 1);


	//rescueIndex should be 17 after 1 Genesis MoonCat Group is added and 1 MoonCat is rescued
	checkRescueIndexValue(17);


	//totalSupply - remainingCats + remainingGenesisCats should equal rescueIndex
	checkRescueIndex();


	//should be 25343 remaining cats after 1 Genesis MoonCat Group is added and 1 MoonCat is rescued
	checkRemainingCats(25343);


	//try to call addGenesisCatGroup from a non-contract owner account - should still fail
	addGenesisCatGroupFromAccount(1, "expect to fail");


	//should still be 240 remainingGenesisCats
	checkRemainingGenesisCats(240);





//check to see if all Genesis MoonCats can be added, but no more than 256

	//try to call addGenesisCatGroup second time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup third timefrom contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup fourth time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup fifth time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup sixth time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup seventh time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup eighth time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup ninth time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup tenth time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup eleventh time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup twelth time from contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup thirteenth timefrom contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup fourteenth timefrom contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup fifteenth timefrom contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup sixteenth timefrom contract owner account after activation
	addGenesisCatGroupFromAccount(0);


	//try to call addGenesisCatGroup seventeenth timefrom contract owner account after activation
	addGenesisCatGroupFromAccount(0, "expected to fail");	


	//try to rescue a MoonCat for account[2]
	rescueCatFromAccount(2, "0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02");
	checkCatOwner(2, "0x00661a3341");


	//account[2] should have a balance of 1 (MoonCats: "0x00661a3341")
	checkAccountBalanceOf(2, 1);


	//rescueIndex should be 258 after all 16 Genesis MoonCat Groups are added and 2 MoonCats are rescued
	checkRescueIndexValue(258);


	//totalSupply - remainingCats + remainingGenesisCats should equal rescueIndex
	checkRescueIndex();


	//should now be 25342 remaining cats after all Genesis MoonCat Groups are added and 2 MoonCats is rescued
	checkRemainingCats(25342);





//check to see if rescueOrder has correct order

	//rescueOrder index 0 should have catId 0xff00000ca7
	checkRescueOrder(0, "0xff00000ca7");
	
	//rescueOrder index 1 should have catId 0xff01000ca7
	checkRescueOrder(1, "0xff01000ca7");
	
	//rescueOrder index 2 should have catId 0xff02000ca7
	checkRescueOrder(2, "0xff02000ca7");
	
	//rescueOrder index 3 should have catId 0xff03000ca7
	checkRescueOrder(3, "0xff03000ca7");
	
	//rescueOrder index 4 should have catId 0xff04000ca7
	checkRescueOrder(4, "0xff04000ca7");
	
	//rescueOrder index 5 should have catId 0xff05000ca7
	checkRescueOrder(5, "0xff05000ca7");
	
	//rescueOrder index 6 should have catId 0xff06000ca7
	checkRescueOrder(6, "0xff06000ca7");
	
	//rescueOrder index 7 should have catId 0xff07000ca7
	checkRescueOrder(7, "0xff07000ca7");
	
	//rescueOrder index 8 should have catId 0xff08000ca7
	checkRescueOrder(8, "0xff08000ca7");
	
	//rescueOrder index 9 should have catId 0xff09000ca7
	checkRescueOrder(9, "0xff09000ca7");
	
	//rescueOrder index 10 should have catId 0xff0a000ca7
	checkRescueOrder(10, "0xff0a000ca7");
	
	//rescueOrder index 11 should have catId 0xff0b000ca7
	checkRescueOrder(11, "0xff0b000ca7");
	
	//rescueOrder index 12 should have catId 0xff0c000ca7
	checkRescueOrder(12, "0xff0c000ca7");
	
	//rescueOrder index 13 should have catId 0xff0d000ca7
	checkRescueOrder(13, "0xff0d000ca7");
	
	//rescueOrder index 14 should have catId 0xff0e000ca7
	checkRescueOrder(14, "0xff0e000ca7");
	
	//rescueOrder index 15 should have catId 0xff0f000ca7
	checkRescueOrder(15, "0xff0f000ca7");
	
	//rescueOrder index 16 should have catId 0x00738ea43a
	checkRescueOrder(16, "0x00738ea43a");
	
	//rescueOrder index 17 should have catId 0xff10000ca7
	checkRescueOrder(17, "0xff10000ca7");
	
	//rescueOrder index 255 should have catId 0xfffe000ca7
	checkRescueOrder(255, "0xfffe000ca7");
	
	//rescueOrder index 256 should have catId 0xffff000ca7
	checkRescueOrder(256, "0xffff000ca7");
	
	//rescueOrder index 257 should have catId 0x00661a3341
	checkRescueOrder(257, "0x00661a3341");
	
	//rescueOrder index 258 should have catId 0x0 - no MoonCat in index
	checkRescueOrder(258, 0x0);






//check to see if added Genesis MoonCats are up for adoption


	//the 1st Genesis MoonCat with catId 0xff00000ca7 should be up for adoption: being sold by contract owner for 0.3 ether to everyone
	checkAdoptionOfferComplete("0xff00000ca7", true, accounts[0], 0.3, 0x0);

	
	//the 6th Genesis MoonCat with catId 0xff05000ca7 should be up for adoption: being sold by contract owner for 0.3 ether to everyone
	checkAdoptionOfferComplete("0xff05000ca7", true, accounts[0], 0.3, 0x0);
	
	
	//the 256th Genesis MoonCat with catId 0xffff000ca7 should be up for adoption: being sold by contract owner for 4.8 ether to everyone
	checkAdoptionOfferComplete("0xffff000ca7", true, accounts[0], 4.8, 0x0);






//check to see if Genesis MoonCats can be adopted for less than their price

	//try to accept the 1st Genesis MoonCat adoption offer for less than price, contract owner - should fail
	acceptAdoptionOfferFromAccount(0, "0xff00000ca7", 0.29, "expect to fail");


	//try to accept the 6th Genesis MoonCat adoption offer for less than price, non contract owner - should fail
	acceptAdoptionOfferFromAccount(1, "0xff05000ca7", 0.29, "expect to fail");






//check to see if Genesis MoonCats can be adopted for correct price

	//try to accept the 1st Genesis MoonCat adoption offer as contract owner
	acceptAdoptionOfferFromAccount(0, "0xff00000ca7", 0.3);
	checkCatOwner(0, "0xff00000ca7");

	//account[0] should have a balance of 1 (MoonCats: "0xff00000ca7")
	checkAccountBalanceOf(0, 1);



	//try to accept the 6th Genesis MoonCat adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(1, "0xff05000ca7", 0.3);
	checkCatOwner(1, "0xff05000ca7");

	//account[1] should have a balance of 2 (MoonCats: "0x00738ea43a", "0xff05000ca7")
	checkAccountBalanceOf(1, 2);



	//try to accept the 256th Genesis MoonCat adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(2, "0xffff000ca7", 4.8);
	checkCatOwner(2, "0xffff000ca7");

	//account[2] should have a balance of 2 (MoonCats: "0x00661a3341", "0xffff000ca7")
	checkAccountBalanceOf(2, 2);






//check to see if accounts that overpay for Genesis MoonCats have pendingWithdrawals and can withdraw

	//try to accept and overpay for the 17th Genesis MoonCat adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(3, "0xff10000ca7", 10);
	checkCatOwner(3, "0xff10000ca7");

	//account[3] should have a balance of 1 (MoonCats: "0xff10000ca7")
	checkAccountBalanceOf(3, 1);

	//account[3] should have a pendingWithdrawals of 9.4 (paid 10 eth for a 0.6 eth offer)
	checkPendingWithdrawals(3, 9.4);

	//try to withdraw funds from account[3] which has 9.4 eth in pendingWithdrawals
	checkWithdraw(3, 9.4);




	//try to aceept and overpay for the 18th Genesis MoonCat adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(4, "0xff11000ca7", 15);
	checkCatOwner(4, "0xff11000ca7");

	//account[4] should have a balance of 1 (MoonCats: "0xff11000ca7")
	checkAccountBalanceOf(4, 1);

	//account[4] should have a pendingWithdrawals of 14.4 (paid 15 eth for a 0.6 eth offer)
	checkPendingWithdrawals(4, 14.4);

	//try to withdraw funds from account[4] which has 14.4 eth in pendingWithdrawals
	checkWithdraw(4, 14.4);




	//try to accept and overpay for the 19th Genesis MoonCat adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(5, "0xff12000ca7", 6);
	checkCatOwner(5, "0xff12000ca7");

	//account[5] should have a balance of 1 (MoonCats: "0xff12000ca7")
	checkAccountBalanceOf(5, 1);

	//account[5] should have a pendingWithdrawals of 5.4 (paid 6 eth for a 0.6 eth offer)
	checkPendingWithdrawals(5, 5.4);

	//try to withdraw funds from account[5] which has 5.4 eth in pendingWithdrawals
	checkWithdraw(5, 5.4);




	//try to accept and overpay for the 21st Genesis MoonCat adoption offer as contract owner
	acceptAdoptionOfferFromAccount(0, "0xff14000ca7", 5);
	checkCatOwner(0, "0xff14000ca7");

	//account[0] should have a balance of 2 (MoonCats: "0xff00000ca7","0xff14000ca7")
	checkAccountBalanceOf(0, 2);

	//account[0] should have a pendingWithdrawals of 4.4 (paid 5 eth for a 0.6 eth offer)
	checkPendingWithdrawals(0, 4.4);

	//try to withdraw funds from account[0] which has 4.4 eth in pendingWithdrawals
	checkWithdraw(0, 4.4);






//check to see if Genesis MoonCats can still be adopted after inital adoption

	//try to adopt already adopted 1st Genesis MoonCat adoption as contract owner - should fail
	acceptAdoptionOfferFromAccount(0, "0xff10000ca7", 5, "expect to fail");

	//try to adopt already adopted 1st Genesis MoonCat adoption as non contract owner - should fail
	acceptAdoptionOfferFromAccount(1, "0xff10000ca7", 5, "expect to fail");

	//try to adopt already adopted 1st Genesis MoonCat adoption as current catOwner - should fail
	acceptAdoptionOfferFromAccount(3, "0xff10000ca7", 5, "expect to fail");







//check to see if Genesis MoonCat adoption offers can be cancelled

	//try to cancel Genesis MoonCat adoption offer for not yet adopted 20th Genesis MoonCat as contract owner - should fail
	cancelAdoptionOfferFromAccount(0, "0xff13000ca7", "expect to fail");


	//try to cancel Genesis MoonCat adoption offer for not yet adopted 20th Genesis MoonCat as non contract owner - should fail
	cancelAdoptionOfferFromAccount(1, "0xff13000ca7", "expect to fail");






//check to see if Genesis MoonCat work with nameCat function

	//try to name newly adopted Genesis MoonCat as catOwner, contract owner
	nameCatFromAccount(0, "0xff00000ca7", "Kramer");
	checkCatName("0xff00000ca7", "Kramer")


	//try to name newly adopted Genesis MoonCat as catOwner, non contract owner
	nameCatFromAccount(1, "0xff05000ca7", "KramerMan");
	checkCatName("0xff05000ca7", "KramerMan")


	//try to name adopted Genesis MoonCat as non catOwner, contract owner - should fail
	nameCatFromAccount(0, "0xffff000ca7", "KramerBuddy", "expect to fail");


	//try to name adopted Genesis MoonCat as non catOwner, non contract owner - should fail
	nameCatFromAccount(1, "0xffff000ca7", "KramerBuddy", "expect to fail");


	//try to name unadopted Genesis MoonCat as non catOwner, contract owner - should fail
	nameCatFromAccount(0, "0xff15000ca7", "KramerBuddy", "expect to fail");


	//try to name unadopted Genesis MoonCat as non catOwner, non contract owner - should fail
	nameCatFromAccount(1, "0xff15000ca7", "KramerBuddy", "expect to fail");


	//try to name 6th Genesis MoonCat while it is being offered for adoption - should fail
	makeAdoptionOfferFromAccount(2, "0xffff000ca7", 1);
	nameCatFromAccount(2, "0xffff000ca7", "KramerMan", "expect to fail");


	//try to cancel adoption offer for 6th Genesis MoonCat and then name it
	cancelAdoptionOfferFromAccount(2, "0xffff000ca7");
	nameCatFromAccount(2, "0xffff000ca7", "KramerBuddy");
	checkCatName("0xffff000ca7", "KramerBuddy");


	//try to name an already named Genesis MoonCat - should fail
	nameCatFromAccount(2, "0xffff000ca7", "Kramer", "expect to fail");


	//try to give the 17th Genesis MoonCat a name longer than 32 bytes (will cut name down to 32 bytes)
	nameCatFromAccount(3, "0xff10000ca7", "Kramer, Destroyer of String, Creator of Cuteness, and Last Born of the Magnificent Black Cat");
	checkCatName("0xff10000ca7", "Kramer, Destroyer of String, Creator of Cuteness, and Last Born of the Magnificent Black Cat");


	//try to name the 18th Genesis MoonCat despite adoption request
	makeAdoptionRequestFromAccount(5, "0xff11000ca7", 1);
	checkCatOwner(4, "0xff11000ca7");
	nameCatFromAccount(4, "0xff11000ca7", "Kramer the Cat");
	checkCatName("0xff11000ca7", "Kramer the Cat");


	//should name the 19th Genesis MoonCat an empty string
	nameCatFromAccount(5, "0xff12000ca7", "");
	checkCatName("0xff12000ca7", "");


	//should name Genesis MoonCat again after naming it an empty string
	nameCatFromAccount(5, "0xff12000ca7", "Kramer Kitty");
	checkCatName("0xff12000ca7", "Kramer Kitty");






//check to see if Genesis MoonCats can be given away

	//try to give non-adopted Genesis MoonCat away as non-catOwner, contract owner - should fail
	giveCatAway(0, 2, "0xff2f000ca7", "expect to fail");


	//try to give adopted Genesis MoonCat away as non-catOwner, non contract owner - should fail 
	giveCatAway(1, 2, "0xff00000ca7", "expect to fail");


	//try to give non-adopted Genesis MoonCat away as contract owner - should fail 
	giveCatAway(0, 2, "0xfff2000ca7", "expect to fail");


	//try to give non-adopted Genesis MoonCat away as non contract owner - should fail 
	giveCatAway(1, 2, "0xfff2000ca7", "expect to fail");


	//try to give adopted Genesis MoonCat away as catOwner, non contract owner
	giveCatAway(4, 0, "0xff11000ca7");


	//account[0] should have a balance of 3 (MoonCats: "0xff00000ca7", "0xff14000ca7", "0xff11000ca7")
	checkAccountBalanceOf(0, 3);

	//try to give adopted Genesis MoonCat away as catOwner, contract owner
	giveCatAway(0, 6, "0xff00000ca7");


	//account[0] should have a balance of 2 (MoonCats: "0xff11000ca7","0xff14000ca7")
	checkAccountBalanceOf(0, 2);






//check to see if makeAdoptionRequest works

	//try to makeAdoptionRequest for adopted Genesis MoonCat as catOwner, contract owner - should fail
	makeAdoptionRequestFromAccount(0, "0xff11000ca7", 5, "expect to fail");


	//try to makeAdoptionRequest for adopted Genesis MoonCat as catOwner, non contract owner - should fail
	makeAdoptionRequestFromAccount(6, "0xff00000ca7", 5, "expect to fail");


	//try to makeAdoptionRequest for not yet adopted Genesis MoonCat as non contract owner - should fail
	makeAdoptionRequestFromAccount(1, "0xff33000ca7", 5, "expect to fail");


	//try to makeAdoptionRequest for not yet adopted Genesis MoonCat as contract owner - should fail
	makeAdoptionRequestFromAccount(0, "0xff44000ca7", 5, "expect to fail");


	//try to makeAdoptionRequest for adopted Genesis MoonCat as non catOwner, non contract owner
	makeAdoptionRequestFromAccount(1, "0xff11000ca7", 5);


	//MoonCat with catId 0xff11000ca7 should be requested: as accounts[1] for 5 ether
	checkAdoptionRequestComplete("0xff11000ca7", true, accounts[1], 5);


	//account[5] should have a pendingWithdrawals of 1 eth after the new adoption request by account[1] for a higher price
	checkPendingWithdrawals(5, 1);


	//try to withdraw funds from account[5] which has 1 eth in pendingWithdrawals
	checkWithdraw(5, 1);


	//try to makeAdoptionRequest again for adopted Genesis MoonCat as non catOwner, contract owner
	makeAdoptionRequestFromAccount(0, "0xffff000ca7", 5);


	//MoonCat with catId 0xffff000ca7 should be requested by accounts[0] for 5 ether
	checkAdoptionRequestComplete("0xffff000ca7", true, accounts[0], 5);






//check to see if acceptAdoptionRequest works 

	//try to acceptAdoptionRequest as non catOwner, contract owner - should fail
	acceptAdoptionRequestFromAccount(0, "0xffff000ca7", "expect to fail");


	//try to acceptAdoptionRequest as non catOwner, non contract owner - should fail
	acceptAdoptionRequestFromAccount(1, "0xff11000ca7", "expect to fail");

	//try to acceptAdoptionRequest as catOwner, contract owner
	checkCatOwner(0, "0xff11000ca7");
	acceptAdoptionRequestFromAccount(0, "0xff11000ca7");
	checkCatOwner(1, "0xff11000ca7");


	//account[0] should have a pendingWithdrawals of 5 (was paid 5 eth for MoonCat "0xff11000ca7")
	checkPendingWithdrawals(0, 5);


	//try to withdraw funds from account[0] which has 5 eth in pendingWithdrawals
	checkWithdraw(0, 5);


	//account[1] should have a balance of 3 (MoonCats: "0x00738ea43a", "0xff05000ca7","0xff11000ca7")
	checkAccountBalanceOf(1, 3);


	//try to acceptAdoptionRequest as catOwner, non contract owner
	checkCatOwner(2,"0xffff000ca7")
	acceptAdoptionRequestFromAccount(2, "0xffff000ca7");
	checkCatOwner(0, "0xffff000ca7");


	//account[2] should have a pendingWithdrawals of 5 (was paid 5 eth for MoonCat "0xffff000ca7")
	checkPendingWithdrawals(2, 5);


	//try to withdraw funds from account[2] which has 5 eth in pendingWithdrawals
	checkWithdraw(2, 5);


	//account[2] should have a balance of 1 (MoonCats: "0x00661a3341")
	checkAccountBalanceOf(2, 1);


	//account[0] should have a balance of 2 (MoonCats: "0xff14000ca7", "0xffff000ca7")
	checkAccountBalanceOf(0, 2);






//check to see if later adoption offers work

	//try to make Genesis MoonCat adoption offer as non catOwner, contract owner - should fail
	makeAdoptionOfferFromAccount(0, "0xff00000ca7", 5, "expect to fail");


	//try to make Genesis MoonCat adoption offer as non catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccount(1, "0xff13000ca7", 5, "expect to fail");


	//try to make Genesis MoonCat adoption offer to specific address as non catOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(0, "0xff00000ca7", 5, 1, "expect to fail");


	//try to make Genesis MoonCat adoption offer to specific address as non catOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(1, "0xff13000ca7", 5, 0, "expect to fail");


	//try to make Genesis MoonCat adoption offer to specific address as catOwner, contract owner
	makeAdoptionOfferFromAccountToAddress(1, "0xff11000ca7", 5, 0);


	//MoonCat with catId 0xff11000ca7 should be offered by accounts[0] for 5 ether
	checkAdoptionOfferComplete("0xff11000ca7", true, accounts[1], 5, accounts[0]);


	//try to make Genesis MoonCat adoption offer to specific address as catOwner, non contract owner
	makeAdoptionOfferFromAccountToAddress(3, "0xff10000ca7", 5, 0);


	//MoonCat with catId 0xff10000ca7 should be offered by accounts[0] for 5 ether
	checkAdoptionOfferComplete("0xff10000ca7", true, accounts[3], 5, accounts[0]);


	//try to make Genesis MoonCat adoption offer as catOwner, contract owner
	makeAdoptionOfferFromAccount(0, "0xff14000ca7", 5);


	//MoonCat with catId 0xff11000ca7 should be offered by accounts[1] for 5 ether
	checkAdoptionOfferComplete("0xff14000ca7", true, accounts[0], 5, 0x0);


	//try to make Genesis MoonCat adoption offer as catOwner, contract owner
	makeAdoptionOfferFromAccount(1, "0xff11000ca7", 5);


	//MoonCat with catId 0xff11000ca7 should be offered by accounts[1] for 5 ether
	checkAdoptionOfferComplete("0xff11000ca7", true, accounts[1], 5, 0x0);


	//try to make Genesis MoonCat adoption offer as catOwner, non contract owner
	makeAdoptionOfferFromAccount(3, "0xff10000ca7", 5);


	//MoonCat with catId 0xff10000ca7 should be offered by accounts[3] for 5 ether
	checkAdoptionOfferComplete("0xff10000ca7", true, accounts[3], 5, 0x0);






//check to see if acceptAdoptionOffer worksm for later adoption offers

	//try to accept Genesis MoonCat adoption offer for less than price as non catOwner, contract owner - should fail
	acceptAdoptionOfferFromAccount(0, "0xff10000ca7", 4, "expect to fail");


	//try to accept Genesis MoonCat adoption offer for less than price as non catOwner, non contract owner - should fail
	acceptAdoptionOfferFromAccount(1, "0xff10000ca7", 4, "expect to fail");


	//try to accept Genesis MoonCat adoption offer for less than price as catOwner, non contract owner - should fail
	acceptAdoptionOfferFromAccount(3, "0xff10000ca7", 4, "expect to fail");


	//try to accept Genesis MoonCat adoption offer for less than price as catOwner, contract owner - should fail
	acceptAdoptionOfferFromAccount(0, "0xff11000ca7", 4, "expect to fail");


	//try to accept Genesis MoonCat adoption offer as non catOwner, contract owner
	acceptAdoptionOfferFromAccount(0, "0xff10000ca7", 5);
	checkCatOwner(0, "0xff10000ca7");


	//account[3] should have a pendingWithdrawals of 5 (was paid 5 eth for MoonCat "0xff10000ca7)
	checkPendingWithdrawals(3, 5);


	//try to withdraw funds from account[3] which has 5 eth in pendingWithdrawals
	checkWithdraw(3, 5);


	//account[0] should have a balance of 3 (MoonCats: "0xff14000ca7", "0xffff000ca7", "0xff10000ca7")
	checkAccountBalanceOf(0, 3);


	//account[3] should have a balance of 0
	checkAccountBalanceOf(3, 0);


	//try to accept Genesis MoonCat adoption offer as non catOwner, non contract owner
	acceptAdoptionOfferFromAccount(3, "0xff11000ca7", 5);	
	checkCatOwner(3, "0xff11000ca7");


	//account[1] should have a pendingWithdrawals of 5 (was paid 5 eth for MoonCat "0xff11000ca7)
	checkPendingWithdrawals(1, 5);


	//try to withdraw funds from account[1] which has 5 eth in pendingWithdrawals
	checkWithdraw(1, 5);


	//account[3] should have a balance of 1 (MoonCats: "0xff11000ca7")
	checkAccountBalanceOf(3, 1);


	//account[1] should have a balance of 2 (MoonCats: "0x00738ea43a", "0xff05000ca7")
	checkAccountBalanceOf(1, 2);





//check to see if final account balances are correct

	//account[0] should have a balance of 3 (MoonCats: "0xff14000ca7", "0xffff000ca7", "0xff10000ca7")
	checkAccountBalanceOf(0, 3);

	//account[1] should have a balance of 2 (MoonCats: "0x00738ea43a", "0xff05000ca7")
	checkAccountBalanceOf(1, 2);

	//account[2] should have a balance of 1 (MoonCats: "0x00661a3341")
	checkAccountBalanceOf(2, 1);

	//account[3] should have a balance of 1 (MoonCats: "0xff11000ca7")
	checkAccountBalanceOf(3, 1);

	//account[4] should have a balance of 0
	checkAccountBalanceOf(4, 0);

	//account[5] should have a balance of 1 (MoonCats: "0xff12000ca7")
	checkAccountBalanceOf(5, 1);

	//account[6] should have a balance of 1 (MoonCats: "0xff00000ca7")
	checkAccountBalanceOf(6, 1);	

	//account[7] should have a balance of 0
	checkAccountBalanceOf(7, 0);





//check to see if pending withdrawals work for unused accounts

	//account[6] should have a pendingWithdrawals of 0
	checkPendingWithdrawals(6, 0);

	//account[7] should have a pendingWithdrawals of 0
	checkPendingWithdrawals(7, 0);





//check to see if withdraw works for unused accounts
	
	//try to withdraw funds from account[6] which has 0
	checkWithdraw(6, 0);	

	//try to withdraw funds from account[7] which has 0
	checkWithdraw(7, 0);	

});