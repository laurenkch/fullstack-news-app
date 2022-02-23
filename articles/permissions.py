from rest_framework import permissions

class IsAuthor(permissions.BasePermission):

    def has_permission(self, request, view):
        forbidden_phases = ['Rejected', 'Archived', 'Published']

        if request.method in permissions.SAFE_METHODS:
            return True
        if request.method == 'POST':
            if request.data.get('phase', False):
                if not request.user.is_staff and request.data['phase'] in forbidden_phases:
                    return False
        return True


    # def has_permission(self, request, view):  
    #     forbidden_phases = ['Rejected', 'Archived', 'Published']

    #     if request.method in permissions.SAFE_METHODS:
    #         return True
    #     if not request.user.is_staff:
    #         return False
    #     if request.method == 'POST':
    #         if request.data.get('phase', False):
    #                 if request.data['phase'] in forbidden_phases:
    #                     return False
    #     return True

    def has_object_permission(self, request, view, obj):
        forbidden_phases = ['Rejected', 'Archived', 'Published']
        editing_requests = ['PUT', 'PATCH', 'DELETE']

        if request.method in permissions.SAFE_METHODS:
            return True
        if request.method in editing_requests:
            if request.data.get('phase',False):
                if not request.user.is_staff and request.data['phase'] in forbidden_phases:
                    return False
        return True
        