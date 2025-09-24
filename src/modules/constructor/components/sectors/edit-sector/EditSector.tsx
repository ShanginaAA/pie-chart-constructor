import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import CModal from 'components/Modal/CModal';
import ColorPicker from 'components/Picker/ColorPicker';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { editSector, updateSector } from 'lib/store/feature/sectors';
import CTextFields from 'modules/common/TextFields/CTextFields';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditSectorProps } from 'types/sector.type';
import * as z from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Название обязательно для заполнения.')
    .max(25, 'Название не должно превышать более 25 символов.'),
  percentages: z.number().gte(1, 'Минимальное значение 1.').lte(100, 'Максимальное значение 100.'),
  color: z.string().min(1, 'Значение обязательно для заполнения.'),
});
type FormSchema = z.infer<typeof formSchema>;

const EditSector: FC<EditSectorProps> = ({ open, sector, onClose }) => {
  const dispatch = useAppDispatch();
  //   console.log(sector);
  const [loading, setLoading] = useState<boolean>(false);

  const formOptions = {
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: sector.name,
      percentages: sector.percentages,
      color: sector.color,
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormSchema>(formOptions);

  const onSubmit: SubmitHandler<FormSchema> = async (data: FormSchema) => {
    setLoading(true);
    dispatch(editSector({ sectorId: sector.sectorId, data }))
      .unwrap()
      .then((response) => {
        dispatch(updateSector(response));
        onClose();
      })
      .catch(({ errors }) => {
        console.log(errors);
      })
      .finally(() => setLoading(false));
  };

  return (
    <CModal title="Редактирование сектора" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid display={'flex'} flexDirection={'column'} gap={2}>
          <CTextFields
            {...register('name')}
            label="Наименование"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <CTextFields
            {...register('percentages', { setValueAs: (v) => Number(v) })}
            label="Значение"
            error={!!errors.percentages}
            helperText={errors.percentages?.message}
          />
          <ColorPicker
            onColorChange={(color) => setValue('color', color)}
            currentColor={watch('color')}
          />
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-around'} gap={2}>
            <Button
              variant="contained"
              color="error"
              loading={loading}
              onClick={onClose}
              sx={{
                width: '100%',
                height: '60px',
                textTransform: 'none',
                fontWeight: '400',
                fontSize: '16px',
                borderRadius: '10px',
              }}
            >
              Отмена
            </Button>
            <Button
              type={'submit'}
              variant="contained"
              loading={loading}
              sx={{
                width: '100%',
                height: '60px',
                textTransform: 'none',
                fontWeight: '400',
                fontSize: '16px',
                borderRadius: '10px',
              }}
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </form>
    </CModal>
  );
};

export default EditSector;
