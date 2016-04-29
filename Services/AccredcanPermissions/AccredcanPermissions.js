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
        this.getPermissions = GetPermissions;
        this.setPermissions = SetPermissions;
        this.hasPermission = HasPermission;

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