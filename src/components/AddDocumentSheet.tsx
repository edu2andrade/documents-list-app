import { useState, useCallback } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Keyboard } from 'react-native';
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';
import { Input } from '@/components/Input';

type AddDocumentPayload = {
  onSubmit: (name: string, version: string) => void;
};

type AddDocumentSheetProps = SheetProps<'add-document-sheet'>;

function AddDocumentSheet(props: AddDocumentSheetProps) {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');

  const handleAddDocument = useCallback(() => {
    if (!name.trim() || !version.trim()) return;
    Keyboard.dismiss();
    const payload = props.payload as AddDocumentPayload;
    payload?.onSubmit(name.trim(), version.trim());
    props.sheetId && SheetManager.hide(props.sheetId);
  }, [name, version, props]);

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={styles.actionSheet}
      gestureEnabled={true}
      keyboardHandlerEnabled={true}
      onClose={() => Keyboard.dismiss()}
      indicatorStyle={styles.indicator}
      defaultOverlayOpacity={0.7}
      snapPoints={[40, 60]}
      initialSnapIndex={0}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Add Document</Text>
        <Text style={styles.subtitle}>Document info</Text>
        <Input label="Name" placeholder="Document title" value={name} onChangeText={setName} />
        <Input label="Version" placeholder="Document version" value={version} onChangeText={setVersion} />
        <TouchableOpacity
          style={[styles.addButton, (!name.trim() || !version.trim()) && styles.disabledButton]}
          onPress={handleAddDocument}
          disabled={!name.trim() || !version.trim()}>
          <Text style={styles.addButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  actionSheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
  },
  indicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#e0e0e0',
    marginTop: 10,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#3e82f3',
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddDocumentSheet;
