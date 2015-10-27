var formulaCalculation;
"use strict";

jQuery.sap.declare("generated.app.Component");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.m.SplitApp");
try {
	jQuery.sap.require("generated.app.models.formulaCalculation");
} catch (e) {
	formulaCalculation = undefined;
}

var navigationWithContext = {

};

sap.ui.core.UIComponent.extend("generated.app.Component", {
	metadata: {
		routing: {
			config: {
				routerClass: "sap.m.routing.Router",
				viewType: "XML",
				viewPath: "generated.app.view",
				controlId: "App",
				clearTarget: false,
				controlAggregation: "detailPages",
				bypassed: {
					target: ["1445917138693_S4", "1445915820018_S0"]
				}
			},
			routes: [{
				pattern: "1445915820018_S0",
				name: "1445915820018_S0",
				target: ["1445917138693_S4", "1445915820018_S0"]
			}, {
				pattern: "1445915820018_S0/1445917138693_S4",
				name: "1445917138693_S4",
				target: ["1445915820018_S0", "1445917138693_S4"]
			}, {
				pattern: "1445915820018_S0/1445931102608_S5",
				name: "1445931102608_S5",
				target: ["1445915820018_S0", "1445931102608_S5"]
			}, {
				pattern: "",
				name: "default",
				target: ["1445917138693_S4", "1445915820018_S0"]
			}],
			targets: {
				"1445915820018_S0": {
					controlAggregation: "masterPages",
					viewName: "1445915820018_S0",
					viewId: "1445915820018_S0",
					viewLevel: "1"
				},
				"1445917138693_S4": {
					controlAggregation: "detailPages",
					viewName: "1445917138693_S4",
					viewId: "1445917138693_S4",
					viewLevel: "2"
				},
				"1445931102608_S5": {
					controlAggregation: "detailPages",
					viewName: "1445931102608_S5",
					viewId: "1445931102608_S5",
					viewLevel: "2"
				}
			}
		}
	},

	createContent: function() {
		var app = new sap.m.SplitApp({
			id: "App"
		});
		var appType = "MASTERDETAIL";
		if (appType === "App") {
			app.setBackgroundColor("#FFFFFF");
		}

		return app;
	},

	init: function() {
		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch: sap.ui.Device.support.touch,
			isNoTouch: !sap.ui.Device.support.touch,
			isPhone: sap.ui.Device.system.phone,
			isNoPhone: !sap.ui.Device.system.phone,
			listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");

		//////////
		jQuery.sap.require("sap.ui.model.odata.ODataModel");
		jQuery.sap.require("sap.ui.app.MockServer");
		var uri = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/models/";
		var oMockServer = new sap.ui.app.MockServer({
			rootUri: uri
		});
		oMockServer.simulate(uri + "metadata.xml", {
			sMockdataBaseUrl: uri + "sampleData.json",
			bGenerateMissingMockData: true
		});
		if (typeof formulaCalculation !== "undefined") {
			// only use if available - global variable
			formulaCalculation.patchMockServer(oMockServer);
		}
		oMockServer.start();
		var oModel = new sap.ui.model.odata.ODataModel(uri, true);
		oModel.setCountSupported(false);
		oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
		this.setModel(oModel);
		//////////

		var router = this.getRouter();
		this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
		router.initialize();
	},

	getNavigationPropertyForNavigationWithContext: function(entityNameSet, targetPageName) {
		var entityNavigations = navigationWithContext[entityNameSet];
		return entityNavigations == null ? null : entityNavigations[targetPageName];
	}
});