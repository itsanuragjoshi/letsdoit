import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Code from "@tiptap/extension-code";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";

import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Code as CodeIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Heading1 as Heading1Icon,
  Heading2 as Heading2Icon,
} from "lucide-react";

export const MultilineInput = ({
  placeholder = "Enter your text here...",
  value,
  onChange,
  className = "",
  ...rest
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      ListItem,
      BulletList,
      OrderedList,
      Bold,
      Italic,
      Code,
      Placeholder.configure({
        placeholder,
      }),
      Heading.configure({
        levels: [1, 2],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      onChange(content);
    },
    editorProps: {
      immediatelyRender: false,
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="bg-gray-950 text-white text-sm p-1 rounded-md"
      >
        <Toolbar editor={editor} />
      </BubbleMenu>
      <EditorContent editor={editor} className={className} {...rest} />
    </>
  );
};

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold") ? "text-blue-500" : ""
        } bg-transparent border-none cursor-pointer p-1 hover:bg-gray-700`}
      >
        <BoldIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "text-blue-500" : ""
        } bg-transparent border-none cursor-pointer p-1 hover:bg-gray-700`}
      >
        <ItalicIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`${
          editor.isActive("code") ? "text-blue-500" : ""
        } bg-transparent border-none cursor-pointer p-1 hover:bg-gray-700`}
      >
        <CodeIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "text-blue-500" : ""
        } bg-transparent border-none cursor-pointer p-1 hover:bg-gray-700`}
      >
        <ListIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "text-blue-500" : ""
        } bg-transparent border-none cursor-pointer p-1 hover:bg-gray-700`}
      >
        <ListOrderedIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${
          editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""
        } bg-transparent border-none cursor-pointer p-1 hover:bg-gray-700`}
      >
        <Heading1Icon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
        } bg-transparent border-none cursor-pointer p-1 hover:bg-gray-700`}
      >
        <Heading2Icon />
      </button>
    </div>
  );
};
