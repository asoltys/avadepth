Namespace AvadepthNet.web

    Public Class Velocity
        Inherits System.Web.UI.Page

        Private reportEntry As BusinessLogicLayer.DepthReportEntry

#Region " Web Form Designer Generated Code "

        'This call is required by the Web Form Designer.
        <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

        End Sub
        Protected WithEvents ddHour As System.Web.UI.WebControls.DropDownList
        Protected WithEvents ddMinute As System.Web.UI.WebControls.DropDownList
        Protected WithEvents Imagebutton1 As System.Web.UI.WebControls.ImageButton
        Protected WithEvents RadioPredicted As System.Web.UI.WebControls.RadioButton
        Protected WithEvents RadioActual As System.Web.UI.WebControls.RadioButton
        Protected WithEvents RadioSelected As System.Web.UI.WebControls.RadioButton
        Protected WithEvents radioUserDefined As System.Web.UI.WebControls.RadioButton
        Protected WithEvents ddFlowList As System.Web.UI.WebControls.DropDownList
        Protected WithEvents ddZone As System.Web.UI.WebControls.DropDownList
        Protected WithEvents radioLegend2 As System.Web.UI.WebControls.RadioButton
        Protected WithEvents radioLegend4 As System.Web.UI.WebControls.RadioButton
        Protected WithEvents txtUserDefined As System.Web.UI.WebControls.TextBox
        Protected WithEvents lblDate As System.Web.UI.WebControls.TextBox
        Protected WithEvents btnMap As System.Web.UI.WebControls.ImageButton
        Protected WithEvents lblNoflow As System.Web.UI.WebControls.Label
        Protected WithEvents lblInvalidDate As System.Web.UI.WebControls.Label
        Protected WithEvents CompareValidator1 As System.Web.UI.WebControls.CompareValidator

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

            If Not Page.IsPostBack Then
                Response.Write("<script>window.open(""velocityoverview.html""" & ",""main"")</script>")

                lblDate.Text = Date.Today.ToShortDateString
                reportEntry = New BusinessLogicLayer.DepthReportEntry
                FillFormInfo()
            Else
                reportEntry = Session("ReportEntry")
            End If

        End Sub

        Private Sub FillFormInfo()

            If reportEntry.GetReportOptions(CDate(lblDate.Text)) Then
                BindFlowrates()

                RadioPredicted.Text = "Predicted (" & reportEntry.Predicted & "m<sup>3</sup>s)"
                RadioActual.Text = "Actual (" & reportEntry.Actual & "m<sup>3</sup>s)"

                RadioPredicted.Enabled = reportEntry.Predicted <> 0
                RadioActual.Enabled = reportEntry.Actual <> 0

                RadioSelected.Enabled = ddFlowList.Items.Count
                radioUserDefined.Enabled = ddFlowList.Items.Count
                Imagebutton1.Enabled = radioUserDefined.Enabled
                lblNoflow.Visible = Not radioUserDefined.Enabled

                If Not RadioPredicted.Enabled And RadioPredicted.Checked Then
                    RadioPredicted.Checked = False
                    RadioActual.Checked = RadioActual.Enabled
                End If

                If Not RadioActual.Enabled And RadioActual.Checked Then
                    RadioActual.Checked = False
                    RadioPredicted.Checked = RadioPredicted.Enabled
                End If

                If Not RadioPredicted.Checked And Not RadioActual.Checked And Not radioUserDefined.Checked And Not RadioSelected.Checked Then
                    RadioSelected.Checked = True
                End If

                Session("ReportEntry") = reportEntry
            End If

        End Sub

        Private Sub BindFlowrates()
            With ddFlowList
                .DataSource = reportEntry.Flowrates
                .DataBind()
            End With
        End Sub

        Private Sub SaveSettings()

            With reportEntry
                .ReportDate = CDate(lblDate.Text)

                If RadioActual.Checked Then
                    .selectedFlowType = .FlowTypes.Actual
                ElseIf RadioPredicted.Checked Then
                    .selectedFlowType = .FlowTypes.Predicted
                ElseIf radioUserDefined.Checked Then
                    .selectedFlowType = .FlowTypes.UserDefined
                    .selectedFlowrate = Convert.ToInt16(txtUserDefined.Text)
                ElseIf RadioSelected.Checked Then
                    .selectedFlowType = .FlowTypes.Selected
                    .selectedFlowrate = ddFlowList.SelectedValue
                End If

                .SelectedHour = ddHour.SelectedValue
                .SelectedMinute = ddMinute.SelectedValue
                .SelectedZone = ddZone.SelectedValue

                .SelectedDisplay = IIf(radioLegend2.Checked, 0, 1)  ' store legend here

            End With

            Session("ReportEntry") = reportEntry

        End Sub


        Private Sub calDate_SelectionChanged(ByVal sender As System.Object, ByVal e As System.EventArgs)
            FillFormInfo()
        End Sub

        Private Sub Imagebutton1_Click(ByVal sender As System.Object, ByVal e As System.Web.UI.ImageClickEventArgs) Handles Imagebutton1.Click
            SaveSettings()
            Response.Write("<script>window.open(""ShowVelocity.aspx"",""main"")</script>")
        End Sub

        Private Sub lblDate_TextChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles lblDate.TextChanged
            FillFormInfo()
        End Sub

        Private Sub btnMap_Click(ByVal sender As System.Object, ByVal e As System.Web.UI.ImageClickEventArgs) Handles btnMap.Click
            Response.Write("<script>window.open(""velocityoverview.html""" & ",""main"")</script>")
        End Sub
    End Class

End Namespace
