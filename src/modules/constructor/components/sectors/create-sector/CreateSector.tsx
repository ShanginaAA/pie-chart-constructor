import { Button, Grid } from '@mui/material';
import ColorPicker from 'components/Picker/ColorPicker';
import CTextFields from 'modules/common/TextFields/CTextFields';
import { FC } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { addSector, createSector } from 'lib/store/feature/sectors';
import { CreateSectorProps } from 'types/sector.type';

const formSchema = z.object({
  // sector_id:
  name: z
    .string()
    .min(1, 'Название обязательно для заполнения.')
    .max(25, 'Название не должно превышать более 25 символов.'),
  percentages: z.number().gte(1, 'Минимальное значение 1.').lte(100, 'Максимальное значение 100.'),
  color: z.string().min(1, 'Значение обязательно для заполнения.'),
});

type FormSchema = z.infer<typeof formSchema>;

const CreateSector: FC<CreateSectorProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const formOptions = {
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: 'rgba(218, 137, 32, 1)',
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
    dispatch(createSector(data))
      .unwrap()
      .then((response) => {
        dispatch(addSector(response));
        onClose();
      })
      .catch(({ errors }) => {
        console.log(errors);
      })
      .finally();
  };

  return (
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

        <Button
          type={'submit'}
          variant="contained"
          sx={{
            height: '60px',
            textTransform: 'none',
            fontWeight: '400',
            fontSize: '16px',
            borderRadius: '10px',
          }}
        >
          Добавить сектор
        </Button>
      </Grid>
    </form>
  );
};

export default CreateSector;
