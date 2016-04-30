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