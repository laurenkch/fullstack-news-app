from rest_framework import permissions

class IsAuthor(permissions.BasePermission):
        
    def has_permission(self, request, view):
        allowed_phases = ['Draft', 'Submitted']

        if request.method in permissions.SAFE_METHODS:
            return True
        if request.method in ['POST', 'PUT', 'PATCH','DELETE']:
            if request.data.get('phase', False):
                    return request.data['phase'] in allowed_phases
        return request.user.is_authenticated
                        

    def has_object_permission(self, request, view, obj):
        allowed_phases = ['Draft', 'Submitted']
        editing_requests = ['PUT', 'PATCH', 'DELETE']

        if request.method in permissions.SAFE_METHODS:
            return True
        if not obj.phase == 'Draft':
            return False 
        if request.method in editing_requests:
            if request.data.get('phase',False):
                if obj.phase == 'Draft':
                    return request.data['phase'] in allowed_phases
        return obj.author == request.user


