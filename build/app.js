(function () {

    angular.module('accredcan.permissions', [
        'accredcan.permissions.library',
        'accredcan.permissions.directives',
        'accredcan.permissions.services'
    ]);

})();
(function () {

    angular.module('accredcan.permissions.directives.accredcanPermissions', [

    ]);
	
	angular.module('accredcan.permissions.directives.accredcanPermissions')
		.directive('accredcanPermissions', AccredcanPermissionsDirective);
		
	AccredcanPermissionsDirective.$inject = ['accredcanPermissions'];
	
	function AccredcanPermissionsDirective(accredcanPermissions) {
	
        return {
            restrict: 'A',
            link: AppPermissionsDirectiveLink
        };
        
        function AppPermissionsDirectiveLink(scope, element, attrs) {
    
			// set config values from attrs or default
			var _permissions = attrs.accredcanPermissions || [];
			var _reverse = typeof attrs.accredcanPermissionsReverse !== 'undefined' ? true : false;
			
			// if permissions met condition, hide element 
			// otherwise, show it
			if (accredcanPermissions.has(JSON.parse(_permissions)) == _reverse) {
				element.hide();
			} else {
				element.show();
			}
			
			// bind event when new permissions set within service
			var unbind = scope.$on('accredcanPermissionsSet', function () {
				if (accredcanPermissions.has(JSON.parse(_permissions)) == _permissions) {
					element.hide();
				} else {
					element.show();
				}
			});
			
			// on element destroy event, remove bindings
			// only really need this if unbind was attached to rootscrope
			// otherwise it will be cleaned up automatically when scope is 
			// destroyed. none the less, still here.
			scope.$on('$destroy', unbind);
		}
        
    }
    
})();
(function () {

    angular.module('accredcan.permissions.directives', [
        'accredcan.permissions.directives.accredcanPermissions'
    ]);

})();
(function () {

    angular.module('accredcan.permissions.library', [
        'ng'
    ]);

})();
(function () {

    angular.module('accredcan.permissions.services', [
        'accredcan.permissions.services.accredcanPermissions'
    ]);

})();
(function () {

    angular.module('accredcan.permissions.services.accredcanPermissions', [

    ]);
	
	angular.module('accredcan.permissions.services.accredcanPermissions')
		.service('accredcanPermissions', AccredcanPermissionsService);
		
	AccredcanPermissionsService.$inject = ['$rootScope'];
	
	function AccredcanPermissionsService($rootScope) {

        // private parameters, set none to start
        var _permissions = [];

        // methods
        this.get = GetPermissions;
        this.set = SetPermissions;
        this.has = HasPermission;

        // get list of accepted permissions
        function GetPermissions() {
            return _permissions;
        }

        // set list of accepted permissions
        function SetPermissions(permissions) {
            _permissions = permissions;
            $rootScope.$emit('accredcanPermissionsSet');
        }

        // check if has permission against 
        // supplied array of permisions
        function HasPermission(permissions) {

            // set to false by default
            var permission = false;

            // loop through private permissions array
            // and set permission true if exists from 
            // passed value
            for (var i = 0; i < permissions.length; i++) {
                var index = _permissions.indexOf(permissions[i]);

                // if it exists, set true and end loop
                if (index != -1) {
                    permission = true;
                    break;
                }
            }

            // return boolean value
            return permission;
        }

    }
    
})();
//# sourceMappingURL=app.js.map
