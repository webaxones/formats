import domReady from '@wordpress/dom-ready'
import { compose, ifCondition } from '@wordpress/compose'
import { withSelect } from '@wordpress/data'
import { BlockControls } from '@wordpress/block-editor'
import { ToolbarButton } from '@wordpress/components'
import { formatBold, formatItalic } from '@wordpress/icons'
import { __ } from '@wordpress/i18n'

domReady( () => {

	// Bold & Italic are unregistered for all blocks using RichText
	wp.richText.unregisterFormatType('core/bold')
	wp.richText.unregisterFormatType('core/italic')
	// wp.richText.unregisterFormatType( 'core/text-color' )
	// wp.richText.unregisterFormatType( 'core/code' )
	// wp.richText.unregisterFormatType( 'core/keyboard' )
	// wp.richText.unregisterFormatType('core/image')
	// wp.richText.unregisterFormatType('core/keyboard')
	// wp.richText.unregisterFormatType('core/superscript')
	// wp.richText.unregisterFormatType('core/subscript')
	// wp.richText.unregisterFormatType('core/underline')
	// wp.richText.unregisterFormatType('core/strikethrough')

	const BoldButton = ( props ) => {
		return (
			<BlockControls>
				<ToolbarButton
					icon={ formatBold }
					title={ __('Bold', 'mytextdomain') }
					onClick={ () => {
						props.onChange(
							wp.richText.toggleFormat( props.value, {
								type: 'core/bold',
							} )
						);
					} }
					isActive={ props.isActive }
				/>
			</BlockControls>
		)
	}

	const ItalicButton = ( props ) => {
		return (
			<BlockControls>
				<ToolbarButton
					icon={ formatItalic }
					title={ __('Italic', 'mytextdomain') }
					onClick={ () => {
						props.onChange(
							wp.richText.toggleFormat( props.value, {
								type: 'core/italic',
							} )
						);
					} }
					isActive={ props.isActive }
				/>
			</BlockControls>
		)
	}

	const ConditionalBoldButton = compose(
        withSelect( select => {
            return {
                selectedBlock: select( 'core/block-editor' ).getSelectedBlock()
            }
        } ),
        ifCondition( props => {
            return (
                props.selectedBlock && props.selectedBlock.name === 'core/paragraph'
            );
        } )
    )( BoldButton )

	const ConditionalItalicButton = compose(
        withSelect( select => {
            return {
                selectedBlock: select( 'core/block-editor' ).getSelectedBlock()
            }
        } ),
        ifCondition(props => {
            return (
                props.selectedBlock && props.selectedBlock.name === 'core/paragraph'
            );
        } )
    )( ItalicButton )

	// Then they are re-registered conditionally (on specific blocks)
	wp.richText.registerFormatType(
        'core/bold', {
            title: __('Bold', 'mytextdomain'),
            tagName: 'strong',
            className: 'myprefix-text-bold',
            edit: ConditionalBoldButton,
        }
    )
	wp.richText.registerFormatType(
        'core/italic', {
            title: __('Italic', 'mytextdomain'),
            tagName: 'em',
            className: 'myprefix-text-italic',
            edit: ConditionalItalicButton,
        }
    )
} )
