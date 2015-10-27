sap.ui.define(["sap/ui/core/mvc/Controller"], function(BaseController) {
	"use strict";

	return BaseController.extend("generated.app.view.1445915820018_S0", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("1445915820018_S0").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
		},
		handleRouteMatched: function(oEvent) {
			var params = {};
			if (oEvent.mParameters.data.context || oEvent.mParameters.data.masterContext) {
				this.sContext = oEvent.mParameters.data.context;
				this.sMasterContext = oEvent.mParameters.data.masterContext;

				if (!this.sMasterContext) {
					this.getView().bindElement("/" + this.sContext, params);
				} else {
					this.getView().bindElement("/" + this.sMasterContext, params);
				}

			}

		}
	});
}, /* bExport= */ true);