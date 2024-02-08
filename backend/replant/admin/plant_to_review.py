from django import forms
from django.contrib import admin
from django.http.request import HttpRequest
from django.utils.html import format_html

from replant.models import Plant, PlantToReview

from .utils import TrackableModelAdmin


class PlanToReviewForm(forms.ModelForm):
    rejection_reason = forms.CharField(
        widget=forms.Textarea({"cols": "20"}), required=False
    )
    review_state = forms.CharField(required=True)

    class Meta:
        model = PlantToReview
        fields = ("rejection_reason", "review_state")

    def clean(self):
        cleaned_data = super().clean()

        if self.errors:
            return

        review_state = cleaned_data["review_state"]
        rejection_reason = cleaned_data.get("rejection_reason")

        if review_state == Plant.ReviewState.REJECTED and not rejection_reason:
            raise forms.ValidationError(
                {"rejection_reason": ["This field is required."]}
            )

        if review_state != Plant.ReviewState.REJECTED and rejection_reason:
            raise forms.ValidationError(
                {
                    "rejection_reason": [
                        "This field is only required in case of rejection."
                    ]
                }
            )


@admin.register(PlantToReview)
class PlantToReviewAdmin(TrackableModelAdmin):
    list_display_links = ("id", "image_tag")
    list_display = (
        "image_tag",
        "id",
        "species",
        "planting_organization",
        "country",
        "created_by",
        "created_at",
        "review_state",
        "rejection_reason",
        "action",
    )
    list_editable = (
        "review_state",
        "rejection_reason",
    )
    list_per_page = 1
    list_max_show_all = 0

    fields = (
        "id",
        "review_state",
        "image_tag",
        "image",
        "latitude",
        "longitude",
        "planting_organization",
        "country",
        "species",
        "is_native",
        "planting_cost_usd",
        "created_by",
        "created_at",
    )
    readonly_fields = fields

    class Media:
        css = {"all": ("css/plant_to_review.css",)}

    def image_tag(self, obj: PlantToReview):
        return format_html('<img class="image-tag" src="{}" />', obj.image.url)

    def action(self, obj: PlantToReview):
        return format_html(
            '<div class="action-box">'
            '<input type="submit" value="Approve" name="action">'
            '<input type="submit" value="Reject" name="action" class="warning">'
            "</div>"
        )

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False

    def changelist_view(
        self, request: HttpRequest, extra_context: dict[str, str] | None = None
    ):
        if "action" in request.POST:
            # Mimic clicking Save button with selected Rejected/Approved state
            review_state = (
                Plant.ReviewState.REJECTED
                if request.POST["action"] == "Reject"
                else Plant.ReviewState.APPROVED
            )
            request.POST._mutable = True
            request.POST["form-0-review_state"] = review_state
            request.POST["_save"] = "Save"
        return super().changelist_view(request, extra_context)

    def has_change_permission(
        self, request: HttpRequest, obj: PlantToReview | None = None
    ) -> bool:
        return True

    def has_delete_permission(
        self, request: HttpRequest, obj: PlantToReview | None = None
    ) -> bool:
        return False

    def get_changelist_form(self, request, **kwargs):
        kwargs.setdefault("form", PlanToReviewForm)
        return super().get_changelist_form(request, **kwargs)
