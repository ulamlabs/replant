from admin_auto_filters.filters import AutocompleteFilterFactory
from django import forms
from django.contrib import admin
from django.http.request import HttpRequest
from django.utils.html import format_html
from rangefilter.filters import DateRangeFilterBuilder

from replant.models import Tree, TreeToReview

from .utils import TrackableModelAdmin

CHOICES = (
    (Tree.ReviewState.APPROVED, "Approve"),
    (Tree.ReviewState.REJECTED, "Reject"),
)


class TreeToReviewForm(forms.ModelForm):
    rejection_reason = forms.CharField(
        widget=forms.Textarea({"cols": "20"}), required=False
    )
    review_state = forms.ChoiceField(widget=forms.RadioSelect, choices=CHOICES)

    def clean(self):
        cleaned_data = super().clean()

        if self.errors:
            return

        review_state = cleaned_data["review_state"]
        rejection_reason = cleaned_data.get("rejection_reason")

        if review_state == Tree.ReviewState.REJECTED and not rejection_reason:
            raise forms.ValidationError(
                {"rejection_reason": ["This field is required."]}
            )

        if review_state != Tree.ReviewState.REJECTED and rejection_reason:
            raise forms.ValidationError(
                {
                    "rejection_reason": [
                        "This field is only required in case of rejection."
                    ]
                }
            )


@admin.register(TreeToReview)
class TreeToReviewAdmin(TrackableModelAdmin):
    list_display_links = ("id", "image_tag")
    list_display = (
        "image_tag",
        "id",
        "species",
        "planting_organization",
        "country",
        "created_by",
        "created_at",
        "rejection_reason",
        "review_state",
    )
    list_editable = (
        "review_state",
        "rejection_reason",
    )
    list_per_page = 10
    list_max_show_all = 0
    list_filter = (
        AutocompleteFilterFactory(title="Species", base_parameter_name="species"),
        AutocompleteFilterFactory(
            title="Planting organization / community",
            base_parameter_name="planting_organization",
        ),
        AutocompleteFilterFactory(title="Country", base_parameter_name="country"),
        AutocompleteFilterFactory(title="Created by", base_parameter_name="created_by"),
        ("created_at", DateRangeFilterBuilder(title="By Created at")),
    )

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
        css = {"all": ("css/tree_to_review.css",)}

    def image_tag(self, obj: TreeToReview):
        return format_html('<img class="image-tag" src="{}" />', obj.image.url)

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False

    def has_change_permission(
        self, request: HttpRequest, obj: TreeToReview | None = None
    ) -> bool:
        return True

    def has_delete_permission(
        self, request: HttpRequest, obj: TreeToReview | None = None
    ) -> bool:
        return False

    def get_changelist_form(self, request, **kwargs):
        kwargs.setdefault("form", TreeToReviewForm)
        return super().get_changelist_form(request, **kwargs)
