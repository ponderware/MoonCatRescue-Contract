var MoonCatRescue = artifacts.require("./MoonCatRescue.sol");

contract('MoonCatRescue', function(accounts) {
	it("should be 25000 available cats", function() {
		MoonCatRescue.deployed().then(function(instance) {
			instance.totalSupply().then(function (availableCats) {
				assert.equal(availableCats.valueOf(), 25000, "25000 cats not available");
			});
		});
	});
});

/*
  it("should begin search", function() {
  	MoonCatRescue.deployed().then(function(instance) {
  		moon = instance;
  		moon.beginSearch({from: accounts[0]});
  		assert.equal(moon.searchSeed, 0x0, "searchSeed not set")
  	})
  })
});
*/