import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Node, mergeAttributes } from '@tiptap/core';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import './RichTextEditor.css';

const DraggableHeading = Heading.extend({ draggable: true });
const DraggableParagraph = Paragraph.extend({ draggable: true });
const DraggableBulletList = BulletList.extend({ draggable: true });
const DraggableOrderedList = OrderedList.extend({ draggable: true });

const ImageBlock = Node.create({
  name: 'image',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: 'img[src]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)];
  },
});

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="rich-text-menu">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        Bullet List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        Ordered List
      </button>
      <button
        type="button"
        onClick={setLink}
        className={editor.isActive('link') ? 'is-active' : ''}
      >
        Link
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      >
        Unlink
      </button>
    </div>
  )
}

const RichTextEditor = ({ value, onChange, onUploadImages }) => {
  const lastEmittedValue = useRef(value);
  const uploadImagesRef = useRef(onUploadImages);

  useEffect(() => {
    uploadImagesRef.current = onUploadImages;
  }, [onUploadImages]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false, paragraph: false, bulletList: false, orderedList: false }),
      DraggableHeading,
      DraggableParagraph,
      DraggableBulletList,
      DraggableOrderedList,
      ImageBlock,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
      }),
    ],
    content: value,
    editorProps: {
      handleDrop(view, event) {
        const files = Array.from(event.dataTransfer?.files || []).filter((file) => file.type.startsWith('image/'));
        if (!files.length || !uploadImagesRef.current) return false;

        event.preventDefault();
        const position = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos ?? view.state.selection.from;
        uploadImagesRef.current(files).then((urls) => {
          if (!urls.length || view.isDestroyed) return;
          const nodes = urls.map((src) => view.state.schema.nodes.image.create({ src, alt: 'Uploaded image' }));
          view.dispatch(view.state.tr.insert(Math.min(position, view.state.doc.content.size), nodes));
        });
        return true;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastEmittedValue.current = html;
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== lastEmittedValue.current) {
      lastEmittedValue.current = value;
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div className="rich-text-editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
