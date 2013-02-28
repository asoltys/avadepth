Public Class MenuHeader
    Inherits System.Web.UI.UserControl

    Private _image, _helpfile As String
    Protected WithEvents imgBtnDepth As System.Web.UI.WebControls.HyperLink
    Protected WithEvents imageBanner As System.Web.UI.WebControls.Image
    Protected WithEvents HelpLink As System.Web.UI.WebControls.HyperLink

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

    End Sub

    'NOTE: The following placeholder declaration is required by the Web Form Designer.
    'Do not delete or move it.
    Private designerPlaceholderDeclaration As System.Object

    Private Sub Page_Init(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Init
        'CODEGEN: This method call is required by the Web Form Designer
        'Do not modify it using the code editor.
        InitializeComponent()
    End Sub

#End Region

    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        'Put user code to initialize the page here
    End Sub

    Property BannerImage() As String
        Get
            Return imageBanner.ImageUrl
        End Get
        Set(ByVal Value As String)
            imageBanner.ImageUrl = Value
        End Set
    End Property

    Property HelpFile() As String
        Get
            Return _helpfile
        End Get
        Set(ByVal Value As String)
            Me.HelpLink.NavigateUrl = Value
            _helpfile = Value
        End Set
    End Property

End Class
