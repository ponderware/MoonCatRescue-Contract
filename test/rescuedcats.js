var MoonCatRescue = artifacts.require("./MoonCatRescue.sol");

contract('MoonCatRescue - Test Rescued MoonCats', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MoonCatRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

/* List of rescued MoonCat seeds and corresponding catIds for Test Mode

"0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237":"0x00738ea43a"
"0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02":"0x00661a3341"
"0xc6ff43145e83ca361200fcd0d3bd455957b539984a66a24fa108ea96cd807c7f":"0x0039749d53"
"0xd1fd0c550975908fc67ced57478f506f64a45e048adfc8605ad693e89ee37acf":"0x007d4bf443"
"0x55dbf92d19467a498c80226bc895d1f8588608127087dab786fdd9b400e968e1":"0x0098d8c2f0"
"0x3e2dff7f5895086ab0f761ac0f8827304ae348507c55fde2e6e5e694a587237e":"0x0033c81d7c"
"0x31ab8968353d7ae039dc0898f9f26743847332d97043c197992bc409743bdeff":"0x002bcfbacf"
"0x538a2f53e53c7438b5a1e5b813bd5b2a02237a10105fd290de58810042cac765":"0x00625cc596"
"0x3c2756791d6dccc5839896586dcd27af4b27c37e50c26c4cf5d82f1a49c48865":"0x00b5348ba3"
"0x597f5e9ea0795884b19fe3f9a62cf524a744571943183289beddd85ac7b771b7":"0x008ebbd965"
"0xa427386effaae3f376b7ae56dfd72542645fb5568a952306f2f0f071c30a6a8c":"0x00dcccea0d"
"0xac368f9215d08f37eb1c061210a4221b356908dd9363a928b07585bfc57b3499":"0x000385d956"
"0xeff9d3df5cbc8322c0de77fb675266d219326114fb6b9ce2fda573644dc85d29":"0x00912b9f62"
"0x38672f9d3134a65326b520415f48b65af9f16b6bb166ba7b2382034a1fc24b12":"0x0005763f37"
"0xaeb181f9f67de9ab7041cf4a258e63d35d9cc63a59e6d252c34880ced9007ff3":"0x00be75ba3a"
"0x39949021e23769972244c94e4324eead949b2b4c6104c65fd615ffdb92cf024a":"0x00429cb5c2"
"0x4db7cae29a9e330ecce66cf73e981ced64ad27638e81daf439b1533173b67c16":"0x0040e7aaff"
"0x11db62d57f8e032c99425be5aa9e76bd92bf9b236a5e0a7a4b3146d8c9b6554e":"0x00816f3eed"
"0x2e4f1de10ff97998ccddf0996e6c5f4b314a94952a6b75b87d4f63f98afb33de":"0x00c06a5913"
"0x20459946ce81d8bfc568e1300b0bdacf247392f37d9eeb42fd2431bdc3ef92c0":"0x0021f04065"
"0xabe12e5d8874a1247ae366c93dc83c15f2ecee01e0260e93b740dd10c7f5320d":"0x009cbeba14"
"0xe62312ea49efacc8f0a2e27036b88d88ce4c7da100c7b8b820c646c40df3af61":"0x00239d6220"
"0x5cdc25acf0dc4323f5be691874c4aa034a8af30ddb714a717683058397487456":"0x00f6c087bb"
"0xbd3be59500797e1758269e6e1b04764049aac9b7f7f3f16c5b5af3eb6c77ca0d":"0x0049b62ee4"
"0xb9e4c0471e8724b9c79a5f82dd48bdc19f47e4d38ae3f2694d09f09520225b91":"0x003e42fddd"
"0xd77f3b5177e65208b04b821e11e60fdd78cd08ae809f18e35c56cc1f13a041ea":"0x0031d7df45"
"0x8f80a9b448784a1af38a6fa64f43d063efa0f7c990c079461adeb07c66d4a84a":"0x00f9cd196a"
"0x1a5d60c5bc095677aafee6839e12f62ef726245b17421bb2bf35b43999f1e81e":"0x00387949da"
"0x3960e2403f8155f0e445840f0e2edca46ebdf7dd71a9e127a20dceca05b9ac2e":"0x00fad54b45"
"0xec9c7ea28d40d3d3265310f995fd62310fea737c99c052d4939af1b685b43f5a":"0x0078548dff"
"0xf3f753ee4c246b2012549a9dedb2d9183c58fad1e094a01b7665a3ea9e52f5f7":"0x0053dbdcf3"
*/

//check that all starting parameters are correct

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

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




//check to see that cats cannot be rescued in Inactive Mode

	//try to rescue MoonCat as non contract owner - should fail
	rescueCatFromAccount(1, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");

	//try to rescue MoonCat as contract owner - should fail
	rescueCatFromAccount(0, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");




//check to see that the modes are working correctly

	//try to activateInTestMode as non contract owner - should fail
	changeModeToTest(1, "expect to fail");

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to activateInTestMode as contract owner
	changeModeToTest(0);

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//searchSeed should now be set to 0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d
	checkSearchSeed("0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d")




//check to see if starting parameters (besides searchSeed) are still correct 

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




//check to see if MoonCats can be rescued from several accounts

	//try to rescue an invalid MoonCat as contract owner - should fail
	rescueCatFromAccount(0, "0x1111111111111111111111111111111111111111111111111111111111111111", "expect to fail");

	//try to rescue an invalid MoonCat as non contract owner - should fail
	rescueCatFromAccount(1, "0x1111111111111111111111111111111111111111111111111111111111111111", "expect to fail");

	//try to rescue MoonCat as contract owner
	rescueCatFromAccount(0, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237");
	checkCatOwner(0, "0x00738ea43a");

	//try to rescue a second MoonCat as contract owner
	rescueCatFromAccount(0, "0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02");
	checkCatOwner(0, "0x00661a3341");

	//try to rescue a third MoonCat as contract owner
	rescueCatFromAccount(0, "0xc6ff43145e83ca361200fcd0d3bd455957b539984a66a24fa108ea96cd807c7f");
	checkCatOwner(0, "0x0039749d53");

	//try to rescue a fourth MoonCat as contract owner
	rescueCatFromAccount(0, "0xd1fd0c550975908fc67ced57478f506f64a45e048adfc8605ad693e89ee37acf");
	checkCatOwner(0, "0x007d4bf443");

	//try to rescue a fifth MoonCat as contract owner
	rescueCatFromAccount(0, "0x55dbf92d19467a498c80226bc895d1f8588608127087dab786fdd9b400e968e1");
	checkCatOwner(0, "0x0098d8c2f0");

	//try to rescue a sixth MoonCat as contract owner
	rescueCatFromAccount(0, "0x3e2dff7f5895086ab0f761ac0f8827304ae348507c55fde2e6e5e694a587237e");
	checkCatOwner(0, "0x0033c81d7c");

	//try to rescue a seventh MoonCat as contract owner
	rescueCatFromAccount(0, "0x31ab8968353d7ae039dc0898f9f26743847332d97043c197992bc409743bdeff");
	checkCatOwner(0, "0x002bcfbacf");

	//try to rescue a eighth MoonCat as contract owner
	rescueCatFromAccount(0, "0x538a2f53e53c7438b5a1e5b813bd5b2a02237a10105fd290de58810042cac765");
	checkCatOwner(0, "0x00625cc596");

	//try to rescue a ninth MoonCat as contract owner
	rescueCatFromAccount(0, "0x3c2756791d6dccc5839896586dcd27af4b27c37e50c26c4cf5d82f1a49c48865");
	checkCatOwner(0, "0x00b5348ba3");

	//try to rescue a tenth MoonCat as contract owner
	rescueCatFromAccount(0, "0x597f5e9ea0795884b19fe3f9a62cf524a744571943183289beddd85ac7b771b7");
	checkCatOwner(0, "0x008ebbd965");					

	//try to rescue MoonCat as account[1]
	rescueCatFromAccount(1, "0xa427386effaae3f376b7ae56dfd72542645fb5568a952306f2f0f071c30a6a8c");
	checkCatOwner(1, "0x00dcccea0d");

	//try to rescue a second MoonCat as account[1]
	rescueCatFromAccount(1, "0xac368f9215d08f37eb1c061210a4221b356908dd9363a928b07585bfc57b3499");
	checkCatOwner(1, "0x000385d956");

	//try to rescue a third MoonCat as account[1]
	rescueCatFromAccount(1, "0xeff9d3df5cbc8322c0de77fb675266d219326114fb6b9ce2fda573644dc85d29");
	checkCatOwner(1, "0x00912b9f62");

	//try to rescue a fourth MoonCat as account[1]
	rescueCatFromAccount(1, "0x38672f9d3134a65326b520415f48b65af9f16b6bb166ba7b2382034a1fc24b12");	
	checkCatOwner(1, "0x0005763f37");

	//try to rescue a fifth MoonCat as account[1]
	rescueCatFromAccount(1, "0xaeb181f9f67de9ab7041cf4a258e63d35d9cc63a59e6d252c34880ced9007ff3");
	checkCatOwner(1, "0x00be75ba3a");

	//try to rescue a sixth MoonCat as account[1]
	rescueCatFromAccount(1, "0x39949021e23769972244c94e4324eead949b2b4c6104c65fd615ffdb92cf024a");
	checkCatOwner(1, "0x00429cb5c2");

	//try to rescue a seventh MoonCat as account[1]
	rescueCatFromAccount(1, "0x4db7cae29a9e330ecce66cf73e981ced64ad27638e81daf439b1533173b67c16");
	checkCatOwner(1, "0x0040e7aaff");

	//try to rescue a eighth MoonCat as account[1]
	rescueCatFromAccount(1, "0x11db62d57f8e032c99425be5aa9e76bd92bf9b236a5e0a7a4b3146d8c9b6554e");
	checkCatOwner(1, "0x00816f3eed");

	//try to rescue a ninth MoonCat as account[1]
	rescueCatFromAccount(1, "0x2e4f1de10ff97998ccddf0996e6c5f4b314a94952a6b75b87d4f63f98afb33de");
	checkCatOwner(1, "0x00c06a5913");

	//try to rescue a tenth MoonCat as account[1]
	rescueCatFromAccount(1, "0x20459946ce81d8bfc568e1300b0bdacf247392f37d9eeb42fd2431bdc3ef92c0");
	checkCatOwner(1, "0x0021f04065");

	//try to rescue MoonCat as account[2]
	rescueCatFromAccount(2, "0xabe12e5d8874a1247ae366c93dc83c15f2ecee01e0260e93b740dd10c7f5320d");
	checkCatOwner(2, "0x009cbeba14");

	//try to rescue MoonCat as account[3]
	rescueCatFromAccount(3, "0xe62312ea49efacc8f0a2e27036b88d88ce4c7da100c7b8b820c646c40df3af61");
	checkCatOwner(3, "0x00239d6220");

	//try to rescue MoonCat as account[4]
	rescueCatFromAccount(4, "0x5cdc25acf0dc4323f5be691874c4aa034a8af30ddb714a717683058397487456");
	checkCatOwner(4, "0x00f6c087bb");

	//try to rescue MoonCat as account[6]
	rescueCatFromAccount(5, "0xbd3be59500797e1758269e6e1b04764049aac9b7f7f3f16c5b5af3eb6c77ca0d");
	checkCatOwner(5, "0x0049b62ee4");

	//try to rescue MoonCat as account[6]
	rescueCatFromAccount(6, "0xb9e4c0471e8724b9c79a5f82dd48bdc19f47e4d38ae3f2694d09f09520225b91");
	checkCatOwner(6, "0x003e42fddd");

	//try to rescue MoonCat as account[7]
	rescueCatFromAccount(7, "0xd77f3b5177e65208b04b821e11e60fdd78cd08ae809f18e35c56cc1f13a041ea");
	checkCatOwner(7, "0x0031d7df45");

	//try to rescue MoonCat as account[8]
	rescueCatFromAccount(8, "0x8f80a9b448784a1af38a6fa64f43d063efa0f7c990c079461adeb07c66d4a84a");
	checkCatOwner(8, "0x00f9cd196a");

	//try to rescue MoonCat as account[9]
	rescueCatFromAccount(9, "0x1a5d60c5bc095677aafee6839e12f62ef726245b17421bb2bf35b43999f1e81e");
	checkCatOwner(9, "0x00387949da");

	//try to rescue MoonCat as account[9]
	rescueCatFromAccount(9, "0x3960e2403f8155f0e445840f0e2edca46ebdf7dd71a9e127a20dceca05b9ac2e");
	checkCatOwner(9, "0x00fad54b45");

	//try to rescue MoonCat as account[9]
	rescueCatFromAccount(9, "0xec9c7ea28d40d3d3265310f995fd62310fea737c99c052d4939af1b685b43f5a");
	checkCatOwner(9, "0x0078548dff");

	//try to rescue MoonCat as account[9]
	rescueCatFromAccount(9, "0xf3f753ee4c246b2012549a9dedb2d9183c58fad1e094a01b7665a3ea9e52f5f7");
	checkCatOwner(9, "0x0053dbdcf3");





//check to see if the rescueOrder is correct

	//rescueOrder index 0 should have catId 0xff00000ca7
	checkRescueOrder(0, "0x00738ea43a");
	
	//rescueOrder index 1 should have catId 0xff01000ca7
	checkRescueOrder(1, "0x00661a3341");
	
	//rescueOrder index 2 should have catId 0xff02000ca7
	checkRescueOrder(2, "0x0039749d53");
	
	//rescueOrder index 3 should have catId 0xff03000ca7
	checkRescueOrder(3, "0x007d4bf443");
	
	//rescueOrder index 4 should have catId 0xff04000ca7
	checkRescueOrder(4, "0x0098d8c2f0");
	
	//rescueOrder index 5 should have catId 0xff05000ca7
	checkRescueOrder(5, "0x0033c81d7c");
	
	//rescueOrder index 6 should have catId 0xff06000ca7
	checkRescueOrder(6, "0x002bcfbacf");
	
	//rescueOrder index 7 should have catId 0xff07000ca7
	checkRescueOrder(7, "0x00625cc596");
	
	//rescueOrder index 8 should have catId 0xff08000ca7
	checkRescueOrder(8, "0x00b5348ba3");
	
	//rescueOrder index 9 should have catId 0xff09000ca7
	checkRescueOrder(9, "0x008ebbd965");
	
	//rescueOrder index 10 should have catId 0xff0a000ca7
	checkRescueOrder(10, "0x00dcccea0d");
	
	//rescueOrder index 11 should have catId 0xff0b000ca7
	checkRescueOrder(11, "0x000385d956");
	
	//rescueOrder index 12 should have catId 0xff0c000ca7
	checkRescueOrder(12, "0x00912b9f62");
	
	//rescueOrder index 13 should have catId 0xff0d000ca7
	checkRescueOrder(13, "0x0005763f37");
	
	//rescueOrder index 14 should have catId 0xff0e000ca7
	checkRescueOrder(14, "0x00be75ba3a");
	
	//rescueOrder index 15 should have catId 0xff0f000ca7
	checkRescueOrder(15, "0x00429cb5c2");
	
	//rescueOrder index 16 should have catId 0x00738ea43a
	checkRescueOrder(16, "0x0040e7aaff");
	
	//rescueOrder index 17 should have catId 0xff10000ca7
	checkRescueOrder(17, "0x00816f3eed");

	//rescueOrder index 18 should have catId 0xff10000ca7
	checkRescueOrder(18, "0x00c06a5913");

	//rescueOrder index 19 should have catId 0xff10000ca7
	checkRescueOrder(19, "0x0021f04065");

	//rescueOrder index 20 should have catId 0xff08000ca7
	checkRescueOrder(20, "0x009cbeba14");
	
	//rescueOrder index 21 should have catId 0xff09000ca7
	checkRescueOrder(21, "0x00239d6220");
	
	//rescueOrder index 22 should have catId 0xff0a000ca7
	checkRescueOrder(22, "0x00f6c087bb");
	
	//rescueOrder index 23 should have catId 0xff0b000ca7
	checkRescueOrder(23, "0x0049b62ee4");
	
	//rescueOrder index 24 should have catId 0xff0c000ca7
	checkRescueOrder(24, "0x003e42fddd");
	
	//rescueOrder index 25 should have catId 0xff0d000ca7
	checkRescueOrder(25, "0x0031d7df45");
	
	//rescueOrder index 26 should have catId 0xff0e000ca7
	checkRescueOrder(26, "0x00f9cd196a");
	
	//rescueOrder index 27 should have catId 0xff0f000ca7
	checkRescueOrder(27, "0x00387949da");
	
	//rescueOrder index 28 should have catId 0x00738ea43a
	checkRescueOrder(28, "0x00fad54b45");
	
	//rescueOrder index 29 should have catId 0xff10000ca7
	checkRescueOrder(29, "0x0078548dff");

	//rescueOrder index 30 should have catId 0xff10000ca7
	checkRescueOrder(30, "0x0053dbdcf3");




//check to see if remainingCats, remainingGenesisCats, and rescueIndex are correct

	//should be 25313 remainingCats (25344-31) (not including Genesis MoonCats)
	checkRemainingCats(25313);


	//should be 256 remainingGenesisCats (no Genesis MoonCats added)
	checkRemainingGenesisCats(256);


	//rescueIndex should equal (totalSupply - (remainingCats + remainingGenesisCats))
	checkRescueIndex();



//check to see that the naming function works

	//try to name a MoonCat as non catOwner, contract owner - should fail 
	nameCatFromAccount(0, "0x00dcccea0d", "Kramer the Fantastic" , "expect to fail");

	//try to name a MoonCat as non catOwner, non contract owner - should fail
	nameCatFromAccount(1, "0x00738ea43a", "Kramer the Fantastic", "expect to fail");

	//try to name a MoonCat as catOwner, contract owner
	nameCatFromAccount(0, "0x00738ea43a", "Kramer the Fantastic");
	checkCatName("0x00738ea43a", "Kramer the Fantastic");

	//try to name a MoonCat as catOwner, non contract owner
	nameCatFromAccount(1, "0x00dcccea0d", "Kramer the Shoelace Slayer");
	checkCatName("0x00dcccea0d", "Kramer the Shoelace Slayer");

	//try to name an already named MoonCat as catOwner, contract owner - should fail
	nameCatFromAccount(0, "0x00738ea43a", "Kramer the Wonderful", "expect to fail");

	//try to name an already named MoonCat as catOwner, non contract owner - should fail
	nameCatFromAccount(1, "0x00dcccea0d", "Kramer the Great", "expect to fail");

	//try to name a MoonCat that is offered for adoption as catOwner, contract owner - should fail
	makeAdoptionOfferFromAccount(0, "0x00661a3341", 5);
	checkAdoptionOfferComplete("0x00661a3341", true, accounts[0], 5, 0x0);
	nameCatFromAccount(0, "0x00661a3341", "Kramer" , "expect to fail");

	//try to name a MoonCat that is offered for adoption as catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccount(1, "0x000385d956", 5);
	checkAdoptionOfferComplete("0x000385d956", true, accounts[1], 5, 0x0);
	nameCatFromAccount(1, "0x000385d956", "Kramer", "expect to fail");

	//try to name a MoonCat with a name longer than 32 bytes - should cut it down to first 32 bytes
	nameCatFromAccount(2, "0x009cbeba14", "KramerKramerKramerKramerKramerKramerKramerKramerKramer");
	checkCatName("0x009cbeba14", "KramerKramerKramerKramerKramerKr");

	//try to name a MoonCat an empty string and then name it again
	nameCatFromAccount(3, "0x00239d6220", "");
	nameCatFromAccount(3, "0x00239d6220", "");
	nameCatFromAccount(3, "0x00239d6220", "cat.");





//check to see whether making adoption offers work

	//try to make an adoption offer for a MoonCat as non catOwner, contract owner - should fail
	makeAdoptionOfferFromAccount(0, "0x00dcccea0d", 5, "expect to fail");

	//try to make an adoption offer for a MoonCat as non catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccount(1, "0x00738ea43a", 5, "expect to fail");

	//try to make an adoption offer for a MoonCat as catOwner, contract owner
	makeAdoptionOfferFromAccount(0, "0x00738ea43a", 5);
	checkAdoptionOfferComplete("0x00738ea43a", true, accounts[0], 5, 0x0);

	//try to make an adoption offer for a MoonCat as catOwner, non contract owner
	makeAdoptionOfferFromAccount(1, "0x00dcccea0d", 5);
	checkAdoptionOfferComplete("0x00dcccea0d", true, accounts[1], 5, 0x0);





//check to see whether making adoption offers to specific addresses works

	//try to make an adoption offer to specific address as non catOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(0, "0x000385d956", 5, 1, "expect to fail");

	//try to make an adoption offer to specific address as non catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(1, "0x00661a3341", 5, 0, "expect to fail");

	//try to make an adoption offer to self as non catOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(0, "0x000385d956", 5, 0, "expect to fail");

	//try to make an adoption offer to self for a MoonCat as non catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(1, "0x00661a3341", 5, 1, "expect to fail");

	//try to make an adoption offer to self as catOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(0, "0x00661a3341", 5, 0, "expect to fail");

	//try to make an adoption offer to self for a MoonCat as catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(1, "0x000385d956", 5, 1, "expect to fail");

	//try to make an adoption offer to specific address for a MoonCat as catOwner, contract owner
	makeAdoptionOfferFromAccountToAddress(0, "0x00661a3341", 5, 1);
	checkAdoptionOfferComplete("0x00661a3341", true, accounts[0], 5, accounts[1]);

	//try to make an adoption offer to specific address for a MoonCat as catOwner, non contract owner
	makeAdoptionOfferFromAccountToAddress(1, "0x000385d956", 5, 0);
	checkAdoptionOfferComplete("0x000385d956", true, accounts[1], 5, accounts[0]);



//check to see whether accepting adoption offers work

	//try to accept an adoption offer as catOwner, contract owner
	makeAdoptionOfferFromAccount(0, "0x0039749d53", 5);
	checkAdoptionOfferComplete("0x0039749d53", true, accounts[0], 5, 0x0);
	acceptAdoptionOfferFromAccount(0, "0x0039749d53", 5)
	checkAdoptionOfferComplete("0x0039749d53", false, 0x0, 0, 0x0);
	checkCatOwner(0, "0x0039749d53");
	checkPendingWithdrawals(0, 5);
	checkWithdraw(0, 5)

	//try to accept an adoption offer as catOwner, non contract owner
	makeAdoptionOfferFromAccount(1, "0x00912b9f62", 5);
	checkAdoptionOfferComplete("0x00912b9f62", true, accounts[1], 5, 0x0);
	acceptAdoptionOfferFromAccount(1, "0x00912b9f62", 5)
	checkAdoptionOfferComplete("0x00912b9f62", false, 0x0, 0, 0x0);
	checkCatOwner(1, "0x00912b9f62");
	checkPendingWithdrawals(1, 5);
	checkWithdraw(1, 5)

	//try to accept an adoption offer as non catOwner, contract owner
	makeAdoptionOfferFromAccount(1, "0x00912b9f62", 5);
	checkAdoptionOfferComplete("0x00912b9f62", true, accounts[1], 5, 0x0);
	acceptAdoptionOfferFromAccount(0, "0x00912b9f62", 5)
	checkAdoptionOfferComplete("0x00912b9f62", false, 0x0, 0, 0x0);
	checkCatOwner(0, "0x00912b9f62");
	checkPendingWithdrawals(1, 5);
	checkWithdraw(1, 5)

	//try to accept an adoption offer as non catOwner, non contract owner
	makeAdoptionOfferFromAccount(0, "0x0039749d53", 5);
	checkAdoptionOfferComplete("0x0039749d53", true, accounts[0], 5, 0x0);
	acceptAdoptionOfferFromAccount(1, "0x0039749d53", 5)
	checkAdoptionOfferComplete("0x0039749d53", false, 0x0, 0, 0x0);
	checkCatOwner(1, "0x0039749d53");
	checkPendingWithdrawals(0, 5);
	checkWithdraw(0, 5)



	//try to accept an adoption offer and overpay as catOwner, contract owner
	makeAdoptionOfferFromAccount(0, "0x007d4bf443", 5);
	checkAdoptionOfferComplete("0x007d4bf443", true, accounts[0], 5, 0x0);
	acceptAdoptionOfferFromAccount(0, "0x007d4bf443", 10)
	checkAdoptionOfferComplete("0x007d4bf443", false, 0x0, 0, 0x0);
	checkCatOwner(0, "0x007d4bf443");
	checkPendingWithdrawals(0, 10);
	checkWithdraw(0, 10);

	//try to accept an adoption offer and overpay as catOwner, non contract owner
	makeAdoptionOfferFromAccount(1, "0x0005763f37", 5);
	checkAdoptionOfferComplete("0x0005763f37", true, accounts[1], 5, 0x0);
	acceptAdoptionOfferFromAccount(1, "0x0005763f37", 10)
	checkAdoptionOfferComplete("0x0005763f37", false, 0x0, 0, 0x0);
	checkCatOwner(1, "0x0005763f37");
	checkPendingWithdrawals(1, 10);
	checkWithdraw(1, 10);

	//try to accept an adoption offer and overpay as non catOwner, contract owner
	makeAdoptionOfferFromAccount(1,"0x0005763f37", 5);
	checkAdoptionOfferComplete("0x0005763f37", true, accounts[1], 5, 0x0);
	acceptAdoptionOfferFromAccount(0, "0x0005763f37", 10)
	checkAdoptionOfferComplete("0x0005763f37", false, 0x0, 0, 0x0);
	checkCatOwner(0, "0x0005763f37");
	checkPendingWithdrawals(0, 5);
	checkWithdraw(0, 5);
	checkPendingWithdrawals(1, 5);
	checkWithdraw(1, 5);

	//try to accept an adoption offer and overpay as non catOwner, non contract owner
	makeAdoptionOfferFromAccount(0, "0x007d4bf443", 5);
	checkAdoptionOfferComplete("0x007d4bf443", true, accounts[0], 5, 0x0);
	acceptAdoptionOfferFromAccount(1, "0x007d4bf443", 10)
	checkAdoptionOfferComplete("0x007d4bf443", false, 0x0, 0, 0x0);
	checkCatOwner(1, "0x007d4bf443");
	checkPendingWithdrawals(1, 5);
	checkWithdraw(1, 5);
	checkPendingWithdrawals(0, 5);
	checkWithdraw(0, 5);


	//try to accept an adoption offer for less than price as catOwner, contract owner - should fail
	makeAdoptionOfferFromAccount(0, "0x0098d8c2f0", 5);
	checkAdoptionOfferComplete("0x0098d8c2f0", true, accounts[0], 5, 0x0);
	acceptAdoptionOfferFromAccount(0, "0x0098d8c2f0", 4, "expect to fail");
	checkAdoptionOfferComplete("0x0098d8c2f0", true, accounts[0], 5, 0x0);

	//try to accept an adoption offer for less than price as catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccount(1, "0x00be75ba3a", 5);
	checkAdoptionOfferComplete("0x00be75ba3a", true, accounts[1], 5, 0x0);
	acceptAdoptionOfferFromAccount(1, "0x00be75ba3a", 4, "expect to fail");
	checkAdoptionOfferComplete("0x00be75ba3a", true, accounts[1], 5, 0x0);

	//try to accept an adoption offer for less than price as non catOwner, contract owner - should fail
	acceptAdoptionOfferFromAccount(0, "0x00be75ba3a", 4, "expect to fail");
	checkAdoptionOfferComplete("0x00be75ba3a", true, accounts[1], 5, 0x0);

	//try to accept an adoption offer for less than price as non catOwner, non contract owner - should fail
	acceptAdoptionOfferFromAccount(1, "0x0098d8c2f0", 4, "expect to fail");
	checkAdoptionOfferComplete("0x0098d8c2f0", true, accounts[0], 5, 0x0);




//check to see whether accepting adoption offers to specific addresses works

	//try to accept an adoption offer to a specific address from a different address as non catOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(1, "0x00429cb5c2", 5, 2);
	checkAdoptionOfferComplete("0x00429cb5c2", true, accounts[1], 5, accounts[2]);
	acceptAdoptionOfferFromAccount(0, "0x00429cb5c2", 5, "expect to fail");
	checkAdoptionOfferComplete("0x00429cb5c2", true, accounts[1], 5, accounts[2]);
	checkCatOwner(1, "0x00429cb5c2");

	//try to accept an adoption offer to a specific address from a different address as non catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(0, "0x0033c81d7c", 5, 2);
	checkAdoptionOfferComplete("0x0033c81d7c", true, accounts[0], 5, accounts[2]);
	acceptAdoptionOfferFromAccount(1, "0x0033c81d7c", 5, "expect to fail");
	checkAdoptionOfferComplete("0x0033c81d7c", true, accounts[0], 5, accounts[2]);
	checkCatOwner(0, "0x0033c81d7c");

	//try to accept an adoption offer to a specific address from a different address as catOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(0, "0x0033c81d7c", 5, 1);
	checkAdoptionOfferComplete("0x0033c81d7c", true, accounts[0], 5, accounts[1]);
	acceptAdoptionOfferFromAccount(0, "0x0033c81d7c", 5, "expect to fail");
	checkAdoptionOfferComplete("0x0033c81d7c", true, accounts[0], 5, accounts[1]);
	checkCatOwner(0, "0x0033c81d7c");

	//try to accept an adoption offer to a specific address from a different address as catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(1, "0x00429cb5c2", 5, 0);
	checkAdoptionOfferComplete("0x00429cb5c2", true, accounts[1], 5, accounts[0]);
	acceptAdoptionOfferFromAccount(1, "0x00429cb5c2", 5, "expect to fail");
	checkAdoptionOfferComplete("0x00429cb5c2", true, accounts[1], 5, accounts[0]);
	checkCatOwner(1, "0x00429cb5c2");

	//try to accept an adoption offer to a specific address from correct address as non catOwner, contract owner
	makeAdoptionOfferFromAccountToAddress(1, "0x00429cb5c2", 5, 0);
	checkAdoptionOfferComplete("0x00429cb5c2", true, accounts[1], 5, accounts[0]);
	acceptAdoptionOfferFromAccount(0, "0x00429cb5c2", 5);
	checkAdoptionOfferComplete("0x00429cb5c2", false, 0x0, 0, 0x0);
	checkCatOwner(0, "0x00429cb5c2");
	checkPendingWithdrawals(1, 5);
	checkWithdraw(1, 5)

	//try to accept an adoption offer to a specific address from correct address as non catOwner, non contract owner
	makeAdoptionOfferFromAccountToAddress(0, "0x0033c81d7c", 5, 1);
	checkAdoptionOfferComplete("0x0033c81d7c", true, accounts[0], 5, accounts[1]);
	acceptAdoptionOfferFromAccount(1, "0x0033c81d7c", 5);
	checkAdoptionOfferComplete("0x0033c81d7c", false, 0x0, 0, 0x0);
	checkCatOwner(1, "0x0033c81d7c");
	checkPendingWithdrawals(0, 5);
	checkWithdraw(0, 5)




//check to see whether canceling adoption offers works

	//try to cancel an adoption offer as non catOwner, contract owner - should fail
	makeAdoptionOfferFromAccount(1, "0x0040e7aaff", 5);
	checkAdoptionOfferComplete("0x0040e7aaff", true, accounts[1], 5, 0x0);
	cancelAdoptionOfferFromAccount(0, "0x0040e7aaff", "expect to fail");
	checkAdoptionOfferComplete("0x0040e7aaff", true, accounts[1], 5, 0x0);

	//try to cancel an adoption offer as non catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccount(0, "0x002bcfbacf", 5);
	checkAdoptionOfferComplete("0x002bcfbacf", true, accounts[0], 5, 0x0);
	cancelAdoptionOfferFromAccount(1, "0x002bcfbacf", "expect to fail");
	checkAdoptionOfferComplete("0x002bcfbacf", true, accounts[0], 5, 0x0);

	//try to cancel an adoption offer as catOwner, contract owner
	makeAdoptionOfferFromAccount(0, "0x002bcfbacf", 5);
	checkAdoptionOfferComplete("0x002bcfbacf", true, accounts[0], 5, 0x0);
	cancelAdoptionOfferFromAccount(0, "0x002bcfbacf");
	checkAdoptionOfferComplete("0x002bcfbacf", false, 0x0, 0, 0x0);

	//try to cancel an adoption offer as catOwner, non contract owner
	makeAdoptionOfferFromAccount(1, "0x0040e7aaff", 5);
	checkAdoptionOfferComplete("0x0040e7aaff", true, accounts[1], 5, 0x0);
	cancelAdoptionOfferFromAccount(1, "0x0040e7aaff");
	checkAdoptionOfferComplete("0x0040e7aaff", false, 0x0, 0, 0x0);




//check to see whether canceling adoption offers to specific addresses works

	//try to cancel an adoption offer to a specific address as non catOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(1, "0x00816f3eed", 5, 0);
	checkAdoptionOfferComplete("0x00816f3eed", true, accounts[1], 5, accounts[0]);
	cancelAdoptionOfferFromAccount(0, "0x00816f3eed", "expect to fail");
	checkAdoptionOfferComplete("0x00816f3eed", true, accounts[1], 5, accounts[0]);

	//try to cancel an adoption offer to a specific address as non catOwner, non contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(0, "0x00625cc596", 5, 1);
	checkAdoptionOfferComplete("0x00625cc596", true, accounts[0], 5, accounts[1]);
	cancelAdoptionOfferFromAccount(1, "0x00625cc596", "expect to fail");
	checkAdoptionOfferComplete("0x00625cc596", true, accounts[0], 5, accounts[1]);

	//try to cancel an adoption offer to a specific address as catOwner, contract owner
	makeAdoptionOfferFromAccountToAddress(0, "0x00625cc596", 5, 1);
	checkAdoptionOfferComplete("0x00625cc596", true, accounts[0], 5, accounts[1]);
	cancelAdoptionOfferFromAccount(0, "0x00625cc596");
	checkAdoptionOfferComplete("0x00625cc596", false, 0x0, 0, 0x0);

	//try to cancel an adoption offer to a specific address as catOwner, non contract owner
	makeAdoptionOfferFromAccountToAddress(1, "0x00816f3eed", 5, 0);
	checkAdoptionOfferComplete("0x00816f3eed", true, accounts[1], 5, accounts[0]);
	cancelAdoptionOfferFromAccount(1, "0x00816f3eed");
	checkAdoptionOfferComplete("0x00816f3eed", false, 0x0, 0, 0x0);





//check to see whether making adoption requests works

	//try to make an adoption request for a MoonCat as catOwner, contract owner - should fail
	makeAdoptionRequestFromAccount(0, "0x002bcfbacf", 5, "expect to fail");

	//try to make an adoption request for a MoonCat as catOwner, non contract owner - should fail
	makeAdoptionRequestFromAccount(1, "0x0040e7aaff", 5, "expect to fail");

	//try to make an adoption request for a MoonCat as non catOwner, contract owner
	makeAdoptionRequestFromAccount(0, "0x0040e7aaff", 5);
	checkAdoptionRequestComplete("0x0040e7aaff", true, accounts[0], 5);	

	//try to make an adoption request for a MoonCat as non catOwner, non contract owner
	makeAdoptionRequestFromAccount(1, "0x002bcfbacf", 5);
	checkAdoptionRequestComplete("0x002bcfbacf", true, accounts[1], 5);	




//check to see whether accepting adoption requests works

	//try to accept an adoption request as non catOwner, contract owner - should fail
	checkCatOwner(1, "0x0040e7aaff");
	makeAdoptionRequestFromAccount(2, "0x0040e7aaff", 10)
	checkAdoptionRequestComplete("0x0040e7aaff", true, accounts[2], 10);		
	acceptAdoptionRequestFromAccount(0, "0x0040e7aaff", "expect to fail");
	checkAdoptionRequestComplete("0x0040e7aaff", true, accounts[2], 10);

	//try to accept an adoption request as non catOwner, non contract owner - should fail
	checkCatOwner(0, "0x002bcfbacf");
	makeAdoptionRequestFromAccount(2, "0x002bcfbacf", 10);
	checkAdoptionRequestComplete("0x002bcfbacf", true, accounts[2], 10);		
	acceptAdoptionRequestFromAccount(1, "0x002bcfbacf", "expect to fail");
	checkAdoptionRequestComplete("0x002bcfbacf", true, accounts[2], 10);

	//try to accept an adoption request as catOwner, contract owner
	checkCatOwner(0, "0x002bcfbacf");
	makeAdoptionRequestFromAccount(1, "0x002bcfbacf", 15);
	checkAdoptionRequestComplete("0x002bcfbacf", true, accounts[1], 15);		
	acceptAdoptionRequestFromAccount(0, "0x002bcfbacf");
	checkAdoptionRequestComplete("0x002bcfbacf", 0x0, 0);
	checkCatOwner(1, "0x002bcfbacf");
	checkPendingWithdrawals(0, 20);
	checkWithdraw(0, 20)

	//try to accept an adoption request as catOwner, non contract owner
	checkCatOwner(1, "0x0040e7aaff");
	makeAdoptionRequestFromAccount(0, "0x0040e7aaff", 15);
	checkAdoptionRequestComplete("0x0040e7aaff", true, accounts[0], 15);		
	acceptAdoptionRequestFromAccount(1, "0x0040e7aaff");
	checkAdoptionRequestComplete("0x0040e7aaff", false, 0x0, 0);
	checkCatOwner(0, "0x0040e7aaff");
	checkPendingWithdrawals(1, 20);
	checkWithdraw(1, 20)



//check to see whether cancelling adoption requests works

	//try to cancel an adoption request as catOwner, contract owner  - should fail
	makeAdoptionRequestFromAccount(3, "0x00625cc596", 10);
	checkAdoptionRequestComplete("0x00625cc596", true, accounts[3], 10);
	cancelAdoptionRequestFromAccount(0, "0x00625cc596", 'expect to fail');	
	checkAdoptionRequestComplete("0x00625cc596", true, accounts[3], 10);

	//try to cancel an adoption request as catOwner, non contract owner  - should fail
	makeAdoptionRequestFromAccount(3, "0x00816f3eed", 10);
	checkAdoptionRequestComplete("0x00816f3eed", true, accounts[3], 10);
	cancelAdoptionRequestFromAccount(1, "0x00816f3eed", "expect to fail");	
	checkAdoptionRequestComplete("0x00816f3eed", true, accounts[3], 10);

	//try to cancel an adoption request as non requester, non catOwner, contract owner
	cancelAdoptionRequestFromAccount(0, "0x00816f3eed", "expect to fail");	
	checkAdoptionRequestComplete("0x00816f3eed", true, accounts[3], 10);

	//try to cancel an adoption request as non requester, non catOwner, non contract owner
	cancelAdoptionRequestFromAccount(1, "0x00625cc596", "expect to fail");	
	checkAdoptionRequestComplete("0x00625cc596", true, accounts[3], 10);

	//try to cancel an adoption request as requester, non catOwner, contract owner
	makeAdoptionRequestFromAccount(0, "0x00816f3eed", 15);
	checkAdoptionRequestComplete("0x00816f3eed", true, accounts[0], 15);
	cancelAdoptionRequestFromAccount(0, "0x00816f3eed");	
	checkAdoptionRequestComplete("0x00816f3eed", false, 0x0, 0);
	checkPendingWithdrawals(0, 0); //refunded eth is transfered upon cancellation
	checkWithdraw(0, 0)

	//try to cancel an adoption request as requester, non catOwner, non contract owner
	makeAdoptionRequestFromAccount(1, "0x00625cc596", 15);
	checkAdoptionRequestComplete("0x00625cc596", true, accounts[1], 15);
	cancelAdoptionRequestFromAccount(1, "0x00625cc596");	
	checkAdoptionRequestComplete("0x00816f3eed", false, 0x0, 0);
	checkPendingWithdrawals(1, 0); //refunded eth is transfered upon cancellation
	checkWithdraw(1, 0)



//check to see whether giving cats away works

	//try to give MoonCat away as non catOwner, contract owner - should fail
	checkCatOwner(1, "0x00c06a5913");
	giveCatAway(0, 4, "0x00c06a5913", "expect to fail");
	checkCatOwner(1, "0x00c06a5913");
	
	//try to give MoonCat away as non catOwner, non contract owner - should fail
	checkCatOwner(0, "0x00b5348ba3");
	giveCatAway(1, 4, "0x00b5348ba3", "expect to fail" );
	checkCatOwner(0, "0x00b5348ba3");
	
	//try to give MoonCat away as catOwner, contract owner
	giveCatAway(0, 4, "0x00b5348ba3");
	checkCatOwner(4, "0x00b5348ba3");
	
	//try to give MoonCat away as catOwner, non contract owner
	giveCatAway(1, 4, "0x00c06a5913");
	checkCatOwner(4, "0x00c06a5913");
	
	//try to give MoonCat away to self as catOwner, contract owner
	checkCatOwner(0, "0x008ebbd965");
	giveCatAway(0, 0, "0x008ebbd965");
	checkCatOwner(0, "0x008ebbd965");
	
	//try to give MoonCat away to self as catOwner, non contract owner
	checkCatOwner(1, "0x0021f04065");
	giveCatAway(1, 1, "0x0021f04065");
	checkCatOwner(1, "0x0021f04065");
	
	//try to give MoonCat away that is offered up for adoption as catOwner, contract owner
	makeAdoptionOfferFromAccount(0, "0x008ebbd965", 5);
	checkAdoptionOfferComplete("0x008ebbd965", true, accounts[0], 5, 0x0);
	giveCatAway(0, 1, "0x008ebbd965");
	checkCatOwner(1, "0x008ebbd965");
	
	//try to give MoonCat away that is offered up for adoption as catOwner, non contract owner
	makeAdoptionOfferFromAccount(1, "0x0021f04065", 5);
	checkAdoptionOfferComplete("0x0021f04065", true, accounts[1], 5, 0x0);
	giveCatAway(1, 0, "0x0021f04065");
	checkCatOwner(0, "0x0021f04065");
	
	//try to give MoonCat away that has an adoption request as catOwner, contract owner
	makeAdoptionRequestFromAccount(1, "0x0021f04065", 5);
	checkAdoptionRequestComplete("0x0021f04065", true, accounts[1], 5);
	giveCatAway(0, 4, "0x0021f04065");
	checkCatOwner(4, "0x0021f04065");
	
	//try to give MoonCat away that has an adoption request as catOwner, non contract owner
	makeAdoptionRequestFromAccount(0, "0x008ebbd965", 5);
	checkAdoptionRequestComplete("0x008ebbd965", true, accounts[0], 5);
	giveCatAway(1, 4, "0x008ebbd965");
	checkCatOwner(4, "0x008ebbd965");

	//try to give MoonCat away that has an adoption request to requester as catOwner, contract owner
	makeAdoptionRequestFromAccount(1, "0x0021f04065", 10);
	checkAdoptionRequestComplete("0x0021f04065", true, accounts[1], 10);
	giveCatAway(4, 1, "0x0021f04065");
	checkCatOwner(1, "0x0021f04065");
	checkPendingWithdrawals(1, 15); //5 eth for cancellation of previous request and 10 for most recent 
	checkWithdraw(1, 15);
	
	//try to give MoonCat away that has an adoption request to requester as catOwner, non contract owner
	makeAdoptionRequestFromAccount(0, "0x008ebbd965", 10);
	checkAdoptionRequestComplete("0x008ebbd965", true, accounts[0], 10);
	giveCatAway(4, 0, "0x008ebbd965");
	checkCatOwner(0, "0x008ebbd965");
	checkPendingWithdrawals(0, 15); //5 eth for cancellation of previous request and 10 for most recent 
	checkWithdraw(0, 15);





//check to see whether adoption offers and requests work together

	//try to accept adoption offer of MoonCat that is being requested as contract owner
	makeAdoptionOfferFromAccount(0, "0x008ebbd965", 5);
	makeAdoptionRequestFromAccount(1, "0x008ebbd965", 5);
	acceptAdoptionOfferFromAccount(1, "0x008ebbd965", 5);
	checkCatOwner(1, "0x008ebbd965");
	checkPendingWithdrawals(1, 5);
	checkWithdraw(1, 5);
	checkPendingWithdrawals(0, 5);
	checkWithdraw(0, 5);

	//try to accept adoption offer of MoonCat that is being requested as contract owner
	makeAdoptionOfferFromAccount(1, "0x0021f04065", 5);
	makeAdoptionRequestFromAccount(0, "0x0021f04065", 5);
	acceptAdoptionOfferFromAccount(0, "0x0021f04065", 5);
	checkCatOwner(0, "0x0021f04065");
	checkPendingWithdrawals(0, 5);
	checkWithdraw(0, 5);
	checkPendingWithdrawals(1, 5);
	checkWithdraw(1, 5);

	//try to accept adoption request that is being offered as contract owner
	makeAdoptionOfferFromAccount(0, "0x0021f04065", 5);
	makeAdoptionRequestFromAccount(1, "0x0021f04065", 5);
	acceptAdoptionRequestFromAccount(0, "0x0021f04065");
	checkCatOwner(1, "0x0021f04065");
	checkPendingWithdrawals(1, 0);
	checkWithdraw(1, 0);
	checkPendingWithdrawals(0, 5);
	checkWithdraw(0, 5);

	//try to accept adoption request that is being offered as non contract owner
	makeAdoptionOfferFromAccount(1, "0x008ebbd965", 5);
	makeAdoptionRequestFromAccount(0, "0x008ebbd965", 5);
	acceptAdoptionRequestFromAccount(1, "0x008ebbd965");
	checkCatOwner(0, "0x008ebbd965");
	checkPendingWithdrawals(0, 0);
	checkWithdraw(0, 0);
	checkPendingWithdrawals(1, 5);
	checkWithdraw(1, 5);



	//try to accept adoption offer of MoonCat that is being requested and overpay as contract owner
	makeAdoptionOfferFromAccount(0, "0x008ebbd965", 5);
	makeAdoptionRequestFromAccount(1, "0x008ebbd965", 5);
	acceptAdoptionOfferFromAccount(1, "0x008ebbd965", 10);
	checkCatOwner(1, "0x008ebbd965");
	checkPendingWithdrawals(1, 10);
	checkWithdraw(1, 10);
	checkPendingWithdrawals(0, 5);
	checkWithdraw(0, 5);

	//try to accept adoption offer of MoonCat that is being requested and overpay as contract owner
	makeAdoptionOfferFromAccount(1, "0x0021f04065", 5);
	makeAdoptionRequestFromAccount(0, "0x0021f04065", 5);
	acceptAdoptionOfferFromAccount(0, "0x0021f04065", 10);
	checkCatOwner(0, "0x0021f04065");
	checkPendingWithdrawals(0, 10);
	checkWithdraw(0, 10);
	checkPendingWithdrawals(1, 5);
	checkWithdraw(1, 5);

	//try to accept adoption request that is being offered for more than adoption offer as contract owner
	makeAdoptionOfferFromAccount(0, "0x0021f04065", 5);
	makeAdoptionRequestFromAccount(1, "0x0021f04065", 10);
	acceptAdoptionRequestFromAccount(0, "0x0021f04065");
	checkCatOwner(1, "0x0021f04065");
	checkPendingWithdrawals(1, 0);
	checkWithdraw(1, 0);
	checkPendingWithdrawals(0, 10);
	checkWithdraw(0, 10);

	//try to accept adoption request that is being offered for more than adoption offer as non contract owner
	makeAdoptionOfferFromAccount(1, "0x008ebbd965", 5);
	makeAdoptionRequestFromAccount(0, "0x008ebbd965", 10);
	acceptAdoptionRequestFromAccount(1, "0x008ebbd965");
	checkCatOwner(0, "0x008ebbd965");
	checkPendingWithdrawals(0, 0);
	checkWithdraw(0, 0);
	checkPendingWithdrawals(1, 10);
	checkWithdraw(1, 10);



	//try to accept adoption offer of MoonCat that is being requested and underpay as contract owner
	makeAdoptionOfferFromAccount(0, "0x008ebbd965", 10);
	makeAdoptionRequestFromAccount(1, "0x008ebbd965", .1);
	acceptAdoptionOfferFromAccount(1, "0x008ebbd965", 5, "expect to fail");
	checkCatOwner(0, "0x008ebbd965");
	checkPendingWithdrawals(1, 0);
	checkWithdraw(1, 0);
	checkPendingWithdrawals(0, 0);
	checkWithdraw(0, 0);

	//try to accept adoption offer of MoonCat that is being requested and underpay as contract owner
	makeAdoptionOfferFromAccount(1, "0x0021f04065", 10);
	makeAdoptionRequestFromAccount(0, "0x0021f04065", .1);
	acceptAdoptionOfferFromAccount(0, "0x0021f04065", 5, "expect to fail");
	checkCatOwner(1, "0x0021f04065");
	checkPendingWithdrawals(0, 0);
	checkWithdraw(0, 0);
	checkPendingWithdrawals(1, 0);
	checkWithdraw(1, 10);

	//try to accept adoption request that is being offered for less than adoption offer as contract owner
	makeAdoptionOfferFromAccount(1, "0x0021f04065", .5);
	makeAdoptionRequestFromAccount(0, "0x0021f04065", .2);
	makeAdoptionRequestFromAccount(0, "0x0021f04065", .9);
	acceptAdoptionRequestFromAccount(1, "0x0021f04065");
	checkCatOwner(0, "0x0021f04065");
	checkPendingWithdrawals(0, .3);  //.1 eth from cancellation of previous request
	checkWithdraw(0, .1);
	checkPendingWithdrawals(1, .9);
	checkWithdraw(1, .9);

	//try to accept adoption request that is being offered for less than adoption offer as non contract owner
	makeAdoptionOfferFromAccount(0, "0x008ebbd965", .5);
	makeAdoptionRequestFromAccount(1, "0x008ebbd965", .2);
	makeAdoptionRequestFromAccount(1, "0x008ebbd965", .9);
	acceptAdoptionRequestFromAccount(0, "0x008ebbd965");
	checkCatOwner(1, "0x008ebbd965");
	checkPendingWithdrawals(1, .3);  //.1 eth from cancellation of previous request
	checkWithdraw(1, .1);
	checkPendingWithdrawals(0, .9);
	checkWithdraw(0, .9);
});