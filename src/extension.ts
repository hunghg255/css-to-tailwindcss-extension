import { CssToTailwind } from 'css2tailwind';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('css-to-tailwindcss', () => {
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);
			let invalidRange = new vscode.Range(editor.selection.start.line, editor.selection.start.character, editor.selection.end.line, editor.selection.end.character);

			// To ensure that above range is completely contained in this document.
			let validFullRange = editor.document.validateRange(invalidRange);
      if (text) {
        const conversionResult = CssToTailwind(`div {${text}}`);
        if (conversionResult.code === 'OK') {
					editor.edit(editBuilder => {
						editBuilder.replace(validFullRange, conversionResult?.data[0]?.resultVal);
					});
        }
      }
    } catch (error) {}
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
