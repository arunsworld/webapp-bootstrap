from rest_framework import views, status
from rest_framework import permissions
from rest_framework.reverse import reverse
from rest_framework.response import Response


class Helper:

    @staticmethod
    def fileuri(filename, request):
        return reverse('file-detail', args=(filename,), request=request)

    @staticmethod
    def save_file(file):
        filename = file.name
        fdata = file.read()
        # Now save fdata to right location
        return filename

    @staticmethod
    def extractParam(request, param):
        params = request.POST
        # return params[param]
        # Implement param extraction from params
        return "TEST"
   

class FileDetail(views.APIView):

    def get(self, request, filename):
        pass

file_detail_view = FileDetail.as_view()


class FileList(views.APIView):

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
        return Response([])

    def post(self, request):
        if (request.FILES and len(request.FILES)>0):
            param = Helper.extractParam(request, 'testParam')
            filename = Helper.save_file(request.FILES['file'])
            fileuri = Helper.fileuri(filename, request)
            return Response(dict(RESPONSE='OK', URI=fileuri), status=status.HTTP_201_CREATED)
        return Response(dict(RESPONSE='No files were found in the request.'), status=status.HTTP_400_BAD_REQUEST)

file_list_view = FileList.as_view()
