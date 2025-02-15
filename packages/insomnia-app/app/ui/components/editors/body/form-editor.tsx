import React, { PureComponent } from 'react';
import { autoBindMethodsForReact } from 'class-autobind-decorator';
import { AUTOBIND_CFG } from '../../../../common/constants';
import KeyValueEditor from '../../key-value-editor/editor';
import { HandleGetRenderContext, HandleRender } from '../../../../common/render';

interface Props {
  onChange: Function,
  parameters: Array<any>,
  nunjucksPowerUserMode: boolean,
  isVariableUncovered: boolean,
  handleRender?: HandleRender,
  handleGetRenderContext?: HandleGetRenderContext,
}

@autoBindMethodsForReact(AUTOBIND_CFG)
class FormEditor extends PureComponent<Props> {
  render() {
    const {
      parameters,
      onChange,
      handleRender,
      handleGetRenderContext,
      nunjucksPowerUserMode,
      isVariableUncovered,
    } = this.props;
    return (
      <div className="scrollable-container tall wide">
        <div className="scrollable">
          <KeyValueEditor
            sortable
            allowFile
            allowMultiline
            namePlaceholder="name"
            valuePlaceholder="value"
            descriptionPlaceholder="description"
            handleRender={handleRender}
            handleGetRenderContext={handleGetRenderContext}
            nunjucksPowerUserMode={nunjucksPowerUserMode}
            isVariableUncovered={isVariableUncovered}
            onChange={onChange}
            pairs={parameters}
          />
        </div>
      </div>
    );
  }
}

export default FormEditor;
