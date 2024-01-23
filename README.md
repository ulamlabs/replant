# replant

Replant project

# Frontend tips

Follow instructions from README files of marketplace-app and upload-app. 

## Tailwind + Visual Studio Code

To prevent `Unknown at rule @tailwind`, add the following setting to `.vscode/settings.json`:

```json
{
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

Next, install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) Visual Studio Code extension.

Adding file association without installing the extension results in broken syntax coloring of CSS files.

Source: [StackOverflow](https://stackoverflow.com/questions/65247279/unknown-at-rule-tailwind-cssunknownatrules)
