module.exports = function (MoonCatRescue, accounts){
	
var errorMessage = "Error: VM Exception while processing transaction: invalid opcode";

//Contract Mode Functions

//changes the mode of the contract to Disabled from an account
function changeModeToDisabled(account, fail) {
	if (fail) {
		it("should not change the contract to Disabled Mode", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.disableBeforeActivation({from: accounts[account]}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error")
				}).then(done).catch(done);
			});
		});
	} else {
		it("should not change the contract to Disabled Mode", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.disableBeforeActivation({from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};	

//changes the mode of the contract to Test from an account
function changeModeToTest(account, fail) {
	if (fail) {
		it("should not change the contract to Disabled Mode", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.activateInTestMode({from: accounts[account]}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error")
				}).then(done).catch(done);
			});
		});
	} else {
		it("should not change the contract to Disabled Mode", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.activateInTestMode({from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};	

//changes the mode of the contract to Live from an account
function changeModeToLive(account, fail) {
	if (fail) {
		it("should not change the contract to Live Mode", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.activate({from: accounts[account]}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error")
				}).then(done).catch(done);
			});
		});
	} else {
		it("should not change the contract to Live Mode", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.activate({from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};	

//checks whether the expected mode of the contract is the current mode
function checkContractMode(expectedValue) {
	it("contract should be in mode " + expectedValue, function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.mode.call().then(function(mode) {
				assert.equal(mode.valueOf(), expectedValue, "contract is not in mode " + expectedValue);
			}).then(done).catch(done);
		});
	});
};





//Functions to check values

//checks whether remainingCats and remainingGenesisCats equal to totalSupply
function checkAddsUpToTotalSupply() {
	it("should be equal to totalSupply", function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.totalSupply.call().then(function(tS) {
				instance.remainingCats.call().then(function(rC) {
					instance.remainingGenesisCats.call().then(function(rGC) {
						assert.equal((rC.toNumber()+rGC.toNumber()),tS.toNumber(),"total remainingCats + remainingGenesisCats not equal to totalSupply");
					}).then(done).catch(done);
				});
			});
		});
	});	
};

//checks whether the expected value of totalSupply is the current value
function checksTotalSupply(expectedValue) {
	it("totalSupply should be equal to " + expectedValue, function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.totalSupply.call().then(function(tS) {
				assert.equal(tS, expectedValue, "totalSupply is not equal to " + expectedValue);
			}).then(done).catch(done);
		});
	});
};

//checks to see whether the expected value of remainingGenesisCats is equal to the current value
function checkRemainingGenesisCats(expectedValue) {
	it("remainingGenesisCats should be equal to " + expectedValue, function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.remainingGenesisCats.call().then(function(rGC) {
				assert.equal(rGC, expectedValue, "remainingGenesisCats is not equal to " + expectedValue);
			}).then(done).catch(done);
		});
	});
};

//checks whether the expected value of the searchSeed is the current value
function checkSearchSeed(expectedValue) {
	it("searchSeed should be equal to " + expectedValue, function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.searchSeed.call().then(function(sS) {
				assert.equal(sS, expectedValue, "searchSeed is not equal to " + expectedValue);
			}).then(done).catch(done);
		});
	});
};

//checks to see whether the expected value of rescueIndex is the current value
function checkRescueIndexValue(expectedValue) {
	it("rescueIndex should be " + expectedValue, function(done) {
		MoonCatRescue.deployed().then(function (instance) {
			instance.rescueIndex.call().then(function(rescueIndex) {
				assert.equal(rescueIndex.valueOf(), expectedValue, "rescueIndex is not " + expectedValue);
			}).then(done).catch(done);
		});
	});
};

//checks to see whether recueIndex equals (totalSupply - (remainingCats + remainingGenesisCats))
function checkRescueIndex() {
	it("rescueIndex should be equal to (totalSupply - (remainingCats + remainingGenesisCats))", function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.totalSupply.call().then(function(tS) {
				instance.remainingCats.call().then(function(rC) {
					instance.remainingGenesisCats.call().then(function(rGC) {
						instance.rescueIndex.call().then(function(rI) {
							assert.equal((tS.toNumber()-(rC.toNumber()+rGC.toNumber())),rI.toNumber(),"rescueIndex is incorrect");
						}).then(done).catch(done);
					});
				});
			});
		});
	});
};

//checks to see whether a rescueOrder index has the expected CatId
function checkRescueOrder(index, expectedCatId) {
	it("catId " + expectedCatId + " should be in rescueOrder["+ index +"]", function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.rescueOrder(index).then(function(CatId) {
				assert.equal(CatId, expectedCatId, "catId " + expectedCatId + " not in rescueOrder["+ index +"]");
			}).then(done).catch(done);
		});
	});
};

//checks to see whether the expected value of remainingCats is the current value
function checkRemainingCats(expectedValue) {	
	it("remainingCats should be " + expectedValue, function(done) {
		MoonCatRescue.deployed().then(function (instance) {
			instance.remainingCats.call().then(function(rC) {
				assert.equal(rC.valueOf(), expectedValue, "remainingCats is not equal to " + expectedValue);
			}).then(done).catch(done);
		});
	});
};	

//checks to see whether the expected value of remainingGenesisCats is the current value
function checkRemainingGenesisCats(expectedValue) {
	it("remainingGenesisCats should be " + expectedValue, function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.remainingGenesisCats.call().then(function(remainingGCG) {
				assert.equal(remainingGCG.valueOf(), expectedValue, "remainingGenesisCats is not equal to " + expectedValue);
			}).then(done).catch(done);
		});	
	});
};

//checks to see whether an account has the expected value for balanceOf
function checkAccountBalanceOf(account, expectedValue) {
	it("account[" + account + "] should have a balanceOf equal to " + expectedValue, function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.balanceOf(accounts[account]).then(function(balance) {
				assert.equal(balance.valueOf(), expectedValue, "account[" + account + "]'s balanceOf is not " + expectedValue);
			}).then(done).catch(done);
		});
	});
};

//checks to see whether an account has the expected value for pendingWithdrawals
function checkPendingWithdrawals(account, expectedValueInEth) {
	var expectedValue = web3.toWei(expectedValueInEth, "ether")
	it("account[" + account + "] should have pendingWithdrawals equal to " + expectedValue, function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.pendingWithdrawals(accounts[account]).then(function(pW) {
				assert.equal(pW.valueOf(), expectedValue, "account[" + account + "]'s pendingWithdrawals is not " + expectedValue);
			}).then(done).catch(done);
		});
	});
};	

//checks to see whether the withdrawing account is credited with ether equal to pendingWithdrawals
function checkWithdraw(account, expectedDifferenceInEth) {
	var expectedDifference = web3.toWei(expectedDifferenceInEth, "ether")
	it("should withdraw funds from account[" + account + "]", function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.pendingWithdrawals(accounts[account]).then(function(pw) {
				var initialBalance = web3.eth.getBalance(accounts[account]);
				instance.withdraw({from: accounts[account]}).then(function(tx) {
					var txReceipt = web3.eth.getTransaction(tx.tx);
					var gasPrice = txReceipt.gasPrice;
					var gasUsed = tx.receipt.gasUsed;
					var gasCost = gasPrice.times(gasUsed);

					var finalBalance = web3.eth.getBalance(accounts[account]); 
					//console.log("initial:", initialBalance.toString(), "final:", finalBalance.toString()
						//,"withdrawal:", pw.toString(), finalBalance.minus(initialBalance).plus(gasCost).valueOf());


						assert.equal(finalBalance.minus(initialBalance).plus(gasCost).valueOf(), pw.valueOf(), "pendingWithdrawals was not deposited in account[" + account + "]");
					}).then(done).catch(done);
			});
		});
	});
};	

//checks to see whether an address is mapped to the expected catId
function checkCatOwner(account, catId) {
	it("account[" + account + "] should be mapped to catId: " + catId, function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.catOwners(catId).then(function(catOwner) {
				assert.equal(catOwner, accounts[account], "account[" + account + "] is not mapped to catId: " + catId);
			}).then(done).catch(done);
		});
	});
};

//checks to see whether the expected catName mapped to a catId has the current value
function checkCatName(catId, name) {
	//converts strings to 32 bytes hexes
	function stringTo32BytesHex(string) {
		var hex = web3.fromUtf8(string);
		return hex = (hex + "0000000000000000000000000000000000000000000000000000000000000000").slice(0,66);
	};

	it("MoonCat " + catId + " should be named " + "'" + name + "'", function(done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.catNames(catId).then(function(catName) {
				assert.equal(catName, stringTo32BytesHex(name), "MoonCat " + catId + "should be named " + name);
			}).then(done).catch(done);
		});
	});
};

//check to see whether the expected exists (true or false) stored in an AdoptionOffer is the current value
function checkAdoptionOfferExists(catId, exists) {
	it("MoonCat " + catId + "'s AdoptionOffer should be " + exists, function (done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.adoptionOffers(catId).then(function(offer) {
				assert.equal(offer[0], exists, "MoonCat " + catId + "'s AdoptionOffer is not" + exists);
			}).then(done).catch(done);
		});
	});
};

//check to see whether the expected catId stored in an AdoptionOffer is the current value
function checkAdoptionOfferCatId(catId) {
	it("MoonCat " + catId + "'s AdoptionOffer should have catId: " + catId, function (done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.adoptionOffers(catId).then(function(offer) {
				assert.equal(offer[1], catId, "MoonCat " + catId + "'s AdoptionOffer does not have catId " + catId);
			}).then(done).catch(done);
		});
	});
};


//check to see whether the expected seller stored in an AdoptionOffer is the current value
function checkAdoptionOfferSeller(catId, seller) {
	it("MoonCat " + catId + "'s AdoptionOffer should be sold by " + "accounts[" + seller + "]", function (done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.adoptionOffers(catId).then(function(offer) {
				assert.equal(offer[2], seller, "MoonCat " + catId + "'s AdoptionOffer is not being sold by " + seller)
			}).then(done).catch(done);
		});
	});
};

//check to see whether the expected price stored in an AdoptionOffer is the current value
function checkAdoptionOfferPrice(catId, priceInEth) {
	var price = web3.toWei(priceInEth, "ether")
	it("MoonCat " + catId + "'s AdoptionOffer should have a price of " + price, function (done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.adoptionOffers(catId).then(function(offer) {
				assert.equal(offer[3].valueOf(), price, "MoonCat " + catId + "'s AdoptionOffer does not have a price of " + price);
			}).then(done).catch(done);
		});
	});
};

//check to see whether the expected onlyOfferTo address stored in an AdoptionOffer is the current value
function checkAdoptionOfferOnlyOfferTo(catId, onlyOfferTo) {
	it("MoonCat " + catId + "'s AdoptionOffer should be offered to " + onlyOfferTo, function (done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.adoptionOffers(catId).then(function(offer) {
				assert.equal(offer[4], onlyOfferTo, "MoonCat " + catId + "'s AdoptionOffer is not being offered to " + onlyOfferTo);
			}).then(done).catch(done);
		});
	});
};

//check to see whether all the expected values stored in an AoptionOffer are the current values
function checkAdoptionOfferComplete(catId, exists, seller, priceInEth, onlyOfferTo) {
	checkAdoptionOfferExists(catId, exists);
	checkAdoptionOfferCatId(catId);
	checkAdoptionOfferSeller(catId, seller);
	checkAdoptionOfferPrice(catId, priceInEth);
	checkAdoptionOfferOnlyOfferTo(catId, onlyOfferTo);
}

//check to see whether the expected exists (true or false) stored in an AdoptionRequest is the current value
function checkAdoptionRequestExists(catId, exists) {
	it("MoonCat " + catId + "'s AdoptionRequest should be " + exists, function (done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.adoptionRequests(catId).then(function(request) {
				assert.equal(request[0], exists, "MoonCat " + catId + "'s AdoptionRequest is not" + exists);
			}).then(done).catch(done);
		});
	});
};	

//check to see whether the expected catId stored in an AdoptionRequest is the current value
function checkAdoptionRequestCatId(catId) {
	it("MoonCat " + catId + "'s AdoptionRequest should have catId" + catId, function (done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.adoptionRequests(catId).then(function(request) {
				assert.equal(request[1], catId, "MoonCat " + catId + "'s AdoptionRequest does not have catId " + catId);
			}).then(done).catch(done);
		});
	});
};		

//check to see whether the expected requester stored in an AdoptionRequest is the current value
function checkAdoptionRequestRequester(catId, requester) {
	it("MoonCat " + catId + "'s AdoptionRequest should be requested by " + "accounts[" + requester + "]", function (done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.adoptionRequests(catId).then(function(request) {
				assert.equal(request[2], requester, "MoonCat " + catId + "'s AdoptionRequest is not being request by " + requester);
			}).then(done).catch(done);
		});
	});
};		

//check to see whether the expected price stored in an AdoptionRequest is the current value
function checkAdoptionRequestPrice(catId, priceInEth) {
	var price = web3.toWei(priceInEth, "ether")
	it("MoonCat " + catId + "'s AdoptionRequest should have a price of " + price, function (done) {
		MoonCatRescue.deployed().then(function(instance) {
			instance.adoptionRequests(catId).then(function(request) {
				assert.equal(request[3], price, "MoonCat " + catId + "'s AdoptionRequest does not have a price of " + price);
			}).then(done).catch(done);
		});
	});
};	

//check to see whether all the expected values stored in an AoptionRequest are the current values
function checkAdoptionRequestComplete(catId, exists, requester, priceInEth) {
	checkAdoptionRequestExists(catId, exists);
	checkAdoptionRequestCatId(catId);
	checkAdoptionRequestRequester(catId, requester);
	checkAdoptionRequestPrice(catId, priceInEth);
}





//Functions that call contract functions

//adds 16 Genesis MoonCats (one round) to the contract
function addGenesisCatGroupFromAccount(account, fail) {
	if (fail) {
		it("should not add one GenesisCatGroup to the contract", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.addGenesisCatGroup({from: accounts[account]}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message")
				}).then(done).catch(done);
			});
		});	
	} else {
		it("should add one GenesisCatGroup to the contract", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.addGenesisCatGroup({from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};

//rescues a MoonCat for an account given a seed
function rescueCatFromAccount(account, seed, fail) {
	if (fail) {
		it("should not rescue MoonCat for account[" + account + "]", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.rescueCat(seed,{from: accounts[account]}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message")
				}).then(done).catch(done);
			});
		});	
	} else {
		it("should rescue MoonCat for account[" + account + "]", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.rescueCat(seed,{from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};

//makes an adoptionOffer for a MoonCat from an account
function makeAdoptionOfferFromAccount(account, catId, priceInEth, fail) {
	var price = web3.toWei(priceInEth, "ether")
	if (fail) {
		it("should not make an adoption offer from account[" + account + "] for MoonCat " + catId + " for " + price + " wei", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.makeAdoptionOffer(catId, price, {from: accounts[account]}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message")
				}).then(done).catch(done);
			});
		});
	} else {
		it("account[" + account + "] should make an adoption offer for MoonCat " + catId + " for " + price + " wei", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.makeAdoptionOffer(catId, price, {from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};		

//makes an adoptionOffer for a MoonCat from an account to a specific address
function makeAdoptionOfferFromAccountToAddress(account, catId, priceInEth, addressTo, fail) {
	var price = web3.toWei(priceInEth, "ether")
	if (fail) {
		it("should not make an adoption offer from account[" + account + "] for MoonCat " + catId + " for " + price + " wei to " + addressTo, function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.makeAdoptionOfferToAddress(catId, price, accounts[addressTo], {from: accounts[account]}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message")
				}).then(done).catch(done);
			});
		});
	} else {
		it("account[" + account + "] should make an adoption offer for MoonCat " + catId + " for " + price + " wei to " + addressTo, function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.makeAdoptionOfferToAddress(catId, price, accounts[addressTo], {from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};		

//accepts an adoptionOffer for a MoonCat from an account
function acceptAdoptionOfferFromAccount(account, catId, priceInEth, fail) {
	var price = web3.toWei(priceInEth, "ether")
	if (fail) {
		it("account[" + account + "] should not accept adoption offer for MoonCat " + catId + " for " + price + " wei", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.acceptAdoptionOffer(catId, {from: accounts[account], value: price}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message");
				}).then(done).catch(done);
			});
		});	
	} else {
		it("account[" + account + "] should accept adoption offer for MoonCat " + catId + "for " + price + " wei", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.acceptAdoptionOffer(catId, {from: accounts[account], value: price});
			}).then(done).catch(done);
		});
	};
};

function cancelAdoptionOfferFromAccount(account, catId, fail) {
	if (fail) {
		it("adoption offer should not be cancelled for MoonCat " + catId, function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.cancelAdoptionOffer(catId, {from: accounts[account]}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message");
				}).then(done).catch(done);
			});
		});
	} else {
		it("adoption offer should be cancelled for MoonCat " + catId, function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.cancelAdoptionOffer(catId, {from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};	

//makes an adoptionRequest for a MoonCat from an account
function makeAdoptionRequestFromAccount(account, catId, priceInEth, fail) {
	var price = web3.toWei(priceInEth, "ether")
	if (fail) {
		it("account[" + account + "] should not make an adoption request for MoonCat " + catId + " for " + price + " wei", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.makeAdoptionRequest(catId, {from:accounts[account], value: price}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message");
				}).then(done).catch(done);
			});
		});
	} else {
		it("account[" + account + "] should make an adoption request for MoonCat " + catId + " for " + price + " wei", function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.makeAdoptionRequest(catId, {from:accounts[account], value: price});
			}).then(done).catch(done);
		});
	};
};

//accepts an adoptionRequest for a MoonCat from an account
function acceptAdoptionRequestFromAccount(account, catId, fail) {
	if (fail) {
		it("account[" + account + "] should not accept adoption request for MoonCat " + catId, function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.acceptAdoptionRequest(catId, {from: accounts[account]}).catch(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message");
				}).then(done).catch(done);
			});	
		});
	} else {
		it("account[" + account + "] should accept adoption request for MoonCat " + catId, function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.acceptAdoptionRequest(catId, {from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};

function cancelAdoptionRequestFromAccount(account, catId, fail) {
	if (fail) {
		it("should not cancel adoption request for MoonCat " + catId, function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.cancelAdoptionRequest(catId, {from: accounts[account]}).catch(function(error) {
 					assert.equal(error.toString(), errorMessage, "not the correct error");
 				}).then(done).catch(done);
			});
		});
	} else {
		it("should cancel adoption request for MooNCat " + catId, function(done) {
			MoonCatRescue.deployed().then(function(instance) {
				instance.cancelAdoptionRequest(catId, {from: accounts[account]});
			}).then(done).catch(done);
		});
	};
};

function nameCatFromAccount(account, catId, name, fail) {
 	//converts strings to 32 bytes hexes
 	function stringTo32BytesHex(string) {
 		var hex = web3.fromUtf8(string);
 		return hex = (hex + "0000000000000000000000000000000000000000000000000000000000000000").slice(0,66);
 	};

 	if (fail) {
 		it("account[" + account + "] should not name MoonCat " + catId, function(done) {
 			MoonCatRescue.deployed().then(function(instance) {
 				instance.nameCat(catId, name, {from: accounts[account]}).catch(function(error) {
 					assert.equal(error.toString(), errorMessage, "not the correct error");
 				}).then(done).catch(done);
 			});
 		});
 	} else {
 		it("account[" + account + "] should name MoonCat " + catId + " '" + name + "'", function(done) {
 			MoonCatRescue.deployed().then(function(instance) {
 				instance.nameCat(catId, stringTo32BytesHex(name), {from: accounts[account]});						
 			}).then(done).catch(done);
 		});
 	};
 };

 function giveCatAway(accountFrom, accountTo, catId, fail) {
 	if (fail) {
 		it("should not give away Genesis MoonCat " + catId + "from account[" + accountFrom + "] to account[" + accountTo + "]", function(done) {
 			MoonCatRescue.deployed().then(function(instance) {
 				instance.giveCat(catId, accounts[accountTo], {from: accounts[accountFrom]}).catch(function(error) {
 					assert.equal(error.toString(), errorMessage, "not the correct error");
 				}).then(done).catch(done);
 			});
 		});
 	} else {
 		it("should give away Genesis MoonCat " + catId + "from account[" + accountFrom + "] to account[" + accountTo + "]", function(done) {
 			MoonCatRescue.deployed().then(function(instance) {
 				instance.giveCat(catId, accounts[accountTo], {from: accounts[accountFrom]});
 			}).then(done).catch(done);
 		});
 	};
 };

 return {	
 	changeModeToDisabled: changeModeToDisabled,
 	changeModeToTest: changeModeToTest,
 	changeModeToLive: changeModeToLive,
 	checkContractMode: checkContractMode,
 	checkAddsUpToTotalSupply: checkAddsUpToTotalSupply,
 	addGenesisCatGroupFromAccount: addGenesisCatGroupFromAccount,
 	checksTotalSupply: checksTotalSupply,
 	checkRemainingGenesisCats: checkRemainingGenesisCats,
 	checkSearchSeed: checkSearchSeed,
 	checkRescueIndexValue: checkRescueIndexValue,
 	checkRescueIndex: checkRescueIndex,
 	checkRescueOrder: checkRescueOrder,
 	checkRemainingCats: checkRemainingCats,
 	checkRemainingGenesisCats: checkRemainingGenesisCats,
 	checkAccountBalanceOf: checkAccountBalanceOf,
 	checkPendingWithdrawals: checkPendingWithdrawals,
 	checkWithdraw: checkWithdraw,
 	rescueCatFromAccount: rescueCatFromAccount,
 	checkCatOwner: checkCatOwner,
 	checkCatName: checkCatName,
 	makeAdoptionOfferFromAccount: makeAdoptionOfferFromAccount,
 	makeAdoptionOfferFromAccountToAddress: makeAdoptionOfferFromAccountToAddress,
 	acceptAdoptionOfferFromAccount: acceptAdoptionOfferFromAccount,
 	makeAdoptionRequestFromAccount: makeAdoptionRequestFromAccount,
 	acceptAdoptionRequestFromAccount: acceptAdoptionRequestFromAccount,
 	checkAdoptionOfferExists: checkAdoptionOfferExists,
 	checkAdoptionOfferCatId: checkAdoptionOfferCatId,
 	checkAdoptionOfferSeller: checkAdoptionOfferSeller,
 	checkAdoptionOfferPrice: checkAdoptionOfferPrice,
 	checkAdoptionOfferOnlyOfferTo: checkAdoptionOfferOnlyOfferTo,
 	checkAdoptionOfferComplete: checkAdoptionOfferComplete,
 	checkAdoptionRequestExists: checkAdoptionRequestExists,
 	checkAdoptionRequestCatId: checkAdoptionRequestCatId,
 	checkAdoptionRequestRequester: checkAdoptionRequestRequester,
 	checkAdoptionRequestPrice: checkAdoptionRequestPrice,
 	checkAdoptionRequestComplete: checkAdoptionRequestComplete,
 	cancelAdoptionOfferFromAccount: cancelAdoptionOfferFromAccount,
 	nameCatFromAccount: nameCatFromAccount,
 	giveCatAway: giveCatAway,
 	cancelAdoptionRequestFromAccount: cancelAdoptionRequestFromAccount,
 }
};